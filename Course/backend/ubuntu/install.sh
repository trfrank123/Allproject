set -e
set -x

sudo apt update
sudo apt install --yes nginx
sudo apt install --yes python3-certbot-nginx

