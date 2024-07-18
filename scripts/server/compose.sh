#!/usr/bin/env bash

scripts_path="./scripts/server"

post_cert_conf_path=./server-configs/$CONFIG_TYPE/post-cert.conf
pre_cert_conf_path=./server-configs/$CONFIG_TYPE/pre-cert.conf
export data_path="./server-configs/certbot"


# extract key-value pairs that will hydrate nginx config files
subs=""
unsets=""
IFS=$'\n'
for line in $(cat .env.proxy); do
  key=${line%%=*}
  subs="$subs '\$$key'"
  unsets="$unsets $key"
done
unset IFS

export $(cat .env.proxy | xargs) # load key-value assignments into environment
tmpfile=$(mktemp)
envsubst "$subs" < $pre_cert_conf_path > $tmpfile && cp $tmpfile $pre_cert_conf_path


if [ ! -d "$data_path" ]; then  # ssl cert not found
  chmod +x $scripts_path/ssl-cert.sh
  $scripts_path/ssl-cert.sh
fi


echo "### Compose Up ..."
envsubst "$subs" < $post_cert_conf_path > $tmpfile && cp $tmpfile $pre_cert_conf_path
sudo docker compose -f $COMPOSE_FNAME up -d

unset "$unsets"