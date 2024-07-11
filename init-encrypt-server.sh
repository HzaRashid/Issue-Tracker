#!/usr/bin/env bash
docker compose &>/dev/null # sending output to /dev/null because we don't want it printed

if [ $? -eq 0 ]; then
    echo "INSTALLED"
else
    echo "NOT INSTALLED"
fi
if ! [ -x "$(command -v docker compose)" ]; then
  # Install Compose plugin for Ubuntu via Docker's Repository:
  # Add Docker's official GPG key:
  apt-get update
  apt-get install ca-certificates curl
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc
  # Add the repository to Apt sources:
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    tee /etc/apt/sources.list.d/docker.list > /dev/null
  apt-get update
  # install the latest version
  apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  # Update the package index, and install the latest version of docker compose
  apt-get update
  apt-get install docker-compose-plugin
  # Verify that docker compose is installed correctly by checking the version.
  docker compose version
fi


domains=($API_DOMAIN)
rsa_key_size=4096
data_path="./server-configs/certbot"
email="$EMAIL" # Adding a valid address is strongly recommended
staging=1 # Set to 1 if you're testing your setup to avoid hitting request limits
echo "shshsh $API_DOMAIN "
echo "shshsh $COMPOSE_FNAME"

if [ -d "$data_path" ]; then exit; fi

if  [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || \ 
    [ ! -e "$data_path/conf/ssl-dhparams.pem" ]
then
  echo "### Downloading recommended TLS parameters ..."
  sudo mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/\
  certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/\
  certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

echo "### Creating dummy certificate for $domains ..."
path="/etc/letsencrypt/live/$domains"
mkdir -p "$data_path/conf/live/$domains"
docker compose -f $COMPOSE_FNAME run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo

echo "### Starting nginx reverse-proxy ..."
docker compose -f $COMPOSE_FNAME up --force-recreate -d reverse-proxy
echo

echo "### Deleting dummy certificate for $domains ..."
docker compose -f $COMPOSE_FNAME run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/$domains && \
  rm -Rf /etc/letsencrypt/archive/$domains && \
  rm -Rf /etc/letsencrypt/renewal/$domains.conf" certbot
echo

echo "### Requesting Let's Encrypt certificate for $domains ..."
#Join $domains to -d args
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done


# Select appropriate email arg
case "$email" in
  "") email_arg="--register-unsafely-without-email" ;;
  *) email_arg="--email $email" ;;
esac

# Enable staging mode if needed
if [ $staging != "0" ]; then staging_arg="--staging"; fi

docker compose -f $COMPOSE_FNAME run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot
echo

echo "### Reloading nginx reverse-proxy ..."
docker compose -f $COMPOSE_FNAME exec reverse-proxy reverse-proxy -s reload