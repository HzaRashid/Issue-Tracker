#!/bin/bash


# sudo docker compose -f docker-compose-server.yml run --rm --entrypoint "\
#   openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
#     -keyout '$path/privkey.pem' \
#     -out '$path/fullchain.pem' \
#     -subj '/CN=localhost'" certbot
#
if ! [ -x "$(command -v docker compose)" ]; then
  # -- Install docker compose plugin for Ubuntu using Docker's Repository: --
  # Add Docker's official GPG key:
  sudo apt-get update
  sudo apt-get install ca-certificates curl
  sudo install -m 0755 -d /etc/apt/keyrings
  sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  sudo chmod a+r /etc/apt/keyrings/docker.asc
  # Add the repository to Apt sources:
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt-get update
  # install the latest version
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  # Update the package index, and install the latest version of docker compose
  sudo apt-get update
  sudo apt-get install docker-compose-plugin
  # Verify that docker compose is installed correctly by checking the version.
  sudo docker compose version
fi

domains=($API_DOMAIN)
rsa_key_size=4096
data_path="./server-configs/certbot"
email="$EMAIL" # Adding a valid address is strongly recommended
staging=1 # Set to 1 if you're testing your setup to avoid hitting request limits
echo $API_DOMAIN # test
echo $COMPOSE_FNAME


if [ -d "$data_path" ]; then
  exit
  # read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
  # if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
  #   exit
  # fi
fi


if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

echo "### Creating dummy certificate for $domains ..."
path="/etc/letsencrypt/live/$domains"
mkdir -p "$data_path/conf/live/$domains"
sudo docker compose -f $COMPOSE_FNAME run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo


echo "### Starting nginx reverse-proxy ..."
sudo docker compose -f $COMPOSE_FNAME up --force-recreate -d reverse-proxy
echo

echo "### Deleting dummy certificate for $domains ..."
sudo docker compose -f $COMPOSE_FNAME run --rm --entrypoint "\
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

sudo docker compose -f $COMPOSE_FNAME run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot
echo

echo "### Reloading nginx reverse-proxy ..."
sudo docker compose -f $COMPOSE_FNAME exec reverse-proxy reverse-proxy -s reload