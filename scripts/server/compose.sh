#!/usr/bin/env bash

scripts_path=./scripts/server
configs_path=./server-configs/$CONFIG_TYPE

post_cert_conf_path=$configs_path/post-cert.conf
pre_cert_conf_path=$configs_path/pre-cert.conf
export data_path="./server-configs/certbot"

if [ "$CONFIG_TYPE" = "proxied" ]; then
  touch $configs_path/temp.conf
  envsubst < $pre_cert_conf_path > $configs_path/temp.conf && mv $configs_path/temp.conf $pre_cert_conf_path
  envsubst < $post_cert_conf_path > $configs_path/temp.conf && mv $configs_path/temp.conf $post_cert_conf_path
fi

# if [ ! -d "$data_path" ]; then  # ssl cert not found
#   chmod +x $scripts_path/ssl-cert.sh
#   $scripts_path/ssl-cert.sh
# fi


# echo "### Compose Up ..."
# cp $post_cert_conf_path $pre_cert_conf_path # do not move/remove - source file might be updated

# sudo docker compose -f $COMPOSE_FNAME up -d 