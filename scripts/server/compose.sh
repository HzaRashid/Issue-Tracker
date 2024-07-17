#!/usr/bin/env bash

scripts_path="./scripts/server"


post_cert_conf_path=./server-configs/$CONFIG_TYPE/post-cert.conf
pre_cert_conf_path=./server-configs/$CONFIG_TYPE/pre-cert.conf
export data_path="./server-configs/certbot"


subs=""
while IFS= read -r line; do
  value=${line#*=}
  name=${line%%=*}
  # echo "V: $value"
  echo "N: '\$$name'"
  subs="$subs '\$$name'"

done < .env.proxy
echo begin"$subs"end

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