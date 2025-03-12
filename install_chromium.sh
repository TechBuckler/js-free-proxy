#!/usr/bin/env bash
set -o errexit
set -o nounset
set -o pipefail
set -o xtrace

# Install dependencies
apt-get update
apt-get install -y wget curl unzip

# Install Chromium
CHROME_VERSION=$(curl -sS https://omahaproxy.appspot.com/linux | head -n 1)
wget https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb -O chrome.deb
apt-get install -y ./chrome.deb
rm chrome.deb
