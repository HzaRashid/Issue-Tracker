#!/usr/bin/env bash

scripts_path="./scripts/server"


post_cert_conf_path=./server-configs/$CONFIG_TYPE/post-cert.conf
pre_cert_conf_path=./server-configs/$CONFIG_TYPE/pre-cert.conf
export data_path="./server-configs/certbot"

if [ "$CONFIG_TYPE" = "proxied" ]; then
  tmpfile=$(mktemp)
  cp --attributes-only --preserve $pre_cert_conf_path $tmpfile
  cat $pre_cert_conf_path | envsubst > $tmpfile && mv $tmpfile $pre_cert_conf_path
  cp --attributes-only --preserve $post_cert_conf_path $tmpfile
  cat $post_cert_conf_path | envsubst > $tmpfile && mv $tmpfile $post_cert_conf_path
fi

if [ ! -d "$data_path" ]; then  # ssl cert not found
  chmod +x $scripts_path/ssl-cert.sh
  $scripts_path/ssl-cert.sh
fi


echo "### Compose Up ..."
cp $post_cert_conf_path $pre_cert_conf_path # do not move/remove - source file might be updated

# sudo docker compose -f $COMPOSE_FNAME up -d 