#!/usr/bin/env bash

docker compose &>/dev/null # sending output to /dev/null because we don't want it printed
if [ $? -eq 0 ]; then
    echo "INSTALLED"
else
  chmod +x $(pwd)/install-docker-compose.sh
  $(pwd)/install-docker-compose.sh
fi


post_cert_conf_path=./server-configs/proxy/post-cert.conf
pre_cert_conf_path=./server-configs/proxy/pre-cert.conf
export data_path="./server-configs/certbot"


if [ ! -d "$data_path" ]; then  # ssl cert not found
  chmod +x $(pwd)/ssl-cert.sh
  $(pwd)/ssl-cert.sh
fi


echo "### Compose Up ..."
cp $post_cert_conf_path $pre_cert_conf_path
sudo docker compose -f $COMPOSE_FNAME up -d