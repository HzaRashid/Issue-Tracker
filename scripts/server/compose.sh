#!/usr/bin/env bash

scripts_path="./scripts/server"

post_cert_conf_path=./server-configs/$CONFIG_TYPE/post-cert.conf
pre_cert_conf_path=./server-configs/$CONFIG_TYPE/pre-cert.conf
export data_path="./server-configs/ssl"


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
envsubst "$subs" < $post_cert_conf_path > $tmpfile && mv $tmpfile $post_cert_conf_path


if [ ! -d "$data_path" ]; then  # ssl cert not found
  mkdir $data_path && mkdir $data_path/certs && mkdir $data_path/private
  touch $data_path/certs/flow-cert.pem
  touch $data_path/private/flow-key.pem
  sudo -E bash -c 'echo "$CERT" > "$data_path/certs/flow-cert.pem"'
  sudo -E bash -c 'echo "$CERT_KEY" > "$data_path/certs/flow-key.pem"'
fi



echo "### Compose Up ..."
sudo docker compose -f $COMPOSE_FNAME up -d

unset "$unsets"