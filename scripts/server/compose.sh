#!/usr/bin/env bash

scripts_path="./scripts/server"

if [ -x "$(command -v docker)" ]; then
    echo "Docker installed"
    # command
else
  chmod +x $scripts_path/install-docker.sh
  $scripts_path/install-docker.sh
fi

post_cert_conf_path=./server-configs/$CONFIG_DIR/post-cert.conf
pre_cert_conf_path=./server-configs/$CONFIG_DIR/pre-cert.conf
export data_path="./server-configs/certbot"

echo "foo $CONFIG_DIR foo"


if [ ! -d "$data_path" ]; then  # ssl cert not found
  chmod +x $scripts_path/ssl-cert.sh
  $scripts_path/ssl-cert.sh
fi


echo "### Compose Up ..."

cp $post_cert_conf_path $pre_cert_conf_path # do not move/remove - source file might be updated
# sudo docker compose -f $COMPOSE_FNAME up -d