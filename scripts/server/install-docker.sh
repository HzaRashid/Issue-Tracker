#!/usr/bin/env bash

# Only recommended for testing and development environments.
if [ -x "$(command -v docker)" ]; then
    echo "Docker already installed"
else
    echo "Installing Docker..."
    sudo curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
fi