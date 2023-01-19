set -e
set -x

npm i
docker buildx build --platform linux/amd64 -t project4backend .

docker save project4backend:latest \
  | zstd \
  | ssh project4backend "
    unzstd | docker load
  "

rsync docker-compose.yml project4backend:~/project4backend/
ssh project4backend "
  cd project4backend && \
  docker-compose up -d
"