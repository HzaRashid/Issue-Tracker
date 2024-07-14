#!/usr/bin/env bash

scripts_path="./scripts/server"

docker compose &>/dev/null # sending output to /dev/null because we don't want it printed
if [ $? -eq 0 ]; then
    echo "INSTALLED"
else
  chmod +x $scripts_path/install-docker-compose.sh
  $scripts_path/install-docker-compose.sh
fi


post_cert_conf_path=./server-configs/proxy/post-cert.conf
pre_cert_conf_path=./server-configs/proxy/pre-cert.conf
export data_path="./server-configs/certbot"


if [ ! -d "$data_path" ]; then  # ssl cert not found
  chmod +x $scripts_path/ssl-cert.sh
  $scripts_path/ssl-cert.sh
fi


echo "### Compose Up ..."
cp $post_cert_conf_path $pre_cert_conf_path # do not move/remove - source file might be updated
# sudo docker compose -f $COMPOSE_FNAME up -d