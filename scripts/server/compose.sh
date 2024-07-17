#!/usr/bin/env bash

scripts_path="./scripts/server"


post_cert_conf_path=./server-configs/$CONFIG_TYPE/post-cert.conf
pre_cert_conf_path=./server-configs/$CONFIG_TYPE/pre-cert.conf
export data_path="./server-configs/certbot"

: '
extract the key-val pairs 
to hydrate in nginx configuration files
'
subs=""
unsets=""
IFS=$'\n'
proxy_env=$(cat .env.proxy)
for line in $proxy_env; do
  key=${line%%=*}
  subs="$subs '\$$key'"
  unsets="$unsets $key"
done
unset IFS

export $($proxy_env | xargs) # load key-val assignments into environment
tmpfile=$(mktemp)
envsubst "$subs" < $pre_cert_conf_path > $tmpfile && mv $tmpfile $pre_cert_conf_path
tmpfile=$(mktemp)
envsubst "$subs" < $post_cert_conf_path > $tmpfile && mv $tmpfile $post_cert_conf_path


if [ ! -d "$data_path" ]; then  # ssl cert not found
  chmod +x $scripts_path/ssl-cert.sh
  $scripts_path/ssl-cert.sh
fi


echo "### Compose Up ..."
cp $post_cert_conf_path $pre_cert_conf_path
sudo docker compose -f $COMPOSE_FNAME up -d

unset "$unsets"