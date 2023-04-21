#!/bin/sh

REGISTRY_IP=kavanet.io:5000
APP_NAME=kavanest-client:live

docker build -f ./Dockerfile.live -t $APP_NAME . && \
docker tag $APP_NAME $REGISTRY_IP/$APP_NAME && \
docker push $REGISTRY_IP/$APP_NAME
