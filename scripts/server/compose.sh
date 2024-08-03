#!/usr/bin/env bash

export data_path="./server-configs/ssl"

mkdir -p $data_path/certs && mkdir -p $data_path/private
touch $data_path/certs/flow-cert.pem
touch $data_path/private/flow-key.pem
sudo -E bash -c 'echo "$CERT" > $data_path/certs/flow-cert.pem'
sudo -E bash -c 'echo "$CERT_KEY" > $data_path/private/flow-key.pem'

echo "### Compose Up ..."
sudo docker compose -f $COMPOSE_FNAME up -d
