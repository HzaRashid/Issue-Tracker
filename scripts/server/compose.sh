#!/usr/bin/env bash

scripts_path="./scripts/server"

post_cert_conf_path=./server-configs/$CONFIG_TYPE/post-cert.conf
pre_cert_conf_path=./server-configs/$CONFIG_TYPE/pre-cert.conf
export data_path="./server-configs/ssl"


if [ ! -d "$data_path" ]; then  # ssl cert not found
  mkdir -p $data_path/certs && mkdir -p $data_path/private
  touch $data_path/certs/flow-cert.pem
  touch $data_path/private/flow-key.pem
  sudo -E bash -c 'echo "$CERT" > $data_path/certs/flow-cert.pem'
  sudo -E bash -c 'echo "$CERT_KEY" > $data_path/private/flow-key.pem'
fi

echo "### Compose Up ..."
sudo docker compose -f $COMPOSE_FNAME up -d
