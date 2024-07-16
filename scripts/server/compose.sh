#!/usr/bin/env bash

scripts_path="./scripts/server"


post_cert_conf_path=./server-configs/$CONFIG_TYPE/post-cert.conf
pre_cert_conf_path=./server-configs/$CONFIG_TYPE/pre-cert.conf
export data_path="./server-configs/certbot"

# if [ "$CONFIG_TYPE" = "proxied" ]; then
subs=""
# for domain in "${domains[@]}"; do
#   domain_args="$domain_args -d $domain"
# done
while IFS= read -r line; do
  value=${line#*=}
  name=${line%%=*}
  # echo "V: $value"
  echo "N: '\$$name'"
  subs="$subs '\$$name'"

done < .env.proxy
echo $subs

tmpfile=$(mktemp)
envsubst < $pre_cert_conf_path > $tmpfile && mv $tmpfile $pre_cert_conf_path
tmpfile=$(mktemp)
envsubst  < $post_cert_conf_path > $tmpfile && mv $tmpfile $post_cert_conf_path

# fi

if [ ! -d "$data_path" ]; then  # ssl cert not found
  chmod +x $scripts_path/ssl-cert.sh
  $scripts_path/ssl-cert.sh
fi


echo "### Compose Up ..."
cp $post_cert_conf_path $pre_cert_conf_path # do not move/remove - source file might be updated
if [ "$CONFIG_TYPE" = "proxied" ]; then
  sudo docker compose -f $COMPOSE_FNAME up -d 

fi
# sudo docker compose -f $COMPOSE_FNAME up -d 