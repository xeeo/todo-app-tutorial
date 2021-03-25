docker build -f todo-backend/Dockerfile -t docker-ws/backend todo-backend/

docker build -f todo-frontend/Dockerfile -t docker-ws/frontend todo-frontend/

docker images



docker-compose build
docker-compose up
docker-compose up -d

docker-compose stop

docker ps

docker stop/kill

docker login

docker tag docker-ws/backend docker.io/adinaclaudiatoma/docker-ws-backend:latest
docker push docker.io/adinaclaudiatoma/docker-ws-backend:latest

docker tag docker-ws/frontend docker.io/adinaclaudiatoma/docker-ws-frontend:latest
docker push docker.io/adinaclaudiatoma/docker-ws-frontend:latest

https://hub.docker.com/repository/docker/adinaclaudiatoma/docker-ws-frontend
https://hub.docker.com/repository/docker/adinaclaudiatoma/docker-ws-backend

