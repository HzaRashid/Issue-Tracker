#!/usr/bin/env bash


domains=($API_DOMAIN)
rsa_key_size=4096
email="$EMAIL"    # Adding a valid address is strongly recommended
staging=1         # Set to 1 if you're testing your setup to avoid hitting request limits


if  [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || \ 
    [ ! -e "$data_path/conf/ssl-dhparams.pem" ]
then
  echo "### Downloading recommended TLS parameters ..."
  sudo mkdir -p "$data_path/conf"

  sudo curl -o "$data_path/conf/options-ssl-nginx.conf" \
  https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf

  sudo curl -o  "$data_path/conf/ssl-dhparams.pem" \
  https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem
  echo
fi


echo "### Creating dummy certificate for $domains ..."

path="/etc/letsencrypt/live/$domains"
sudo mkdir -p "$data_path/conf/live/$domains"
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
  certbot -v certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot
echo


echo "### Clean Up ..."
sudo docker rm -f reverse-proxy || true 
sudo bash -c 'echo y | docker system prune'
echo