#!/bin/sh
 
# yarn install && \
# yarn build && \
# docker build -f ./Dockerfile.kube -t grafana-interconnector . && \
# docker tag grafana-interconnector 192.168.1.42:5000/grafana-interconnector && \
# docker push 192.168.1.42:5000/grafana-interconnector

REGISTRY_IP=192.168.1.61:5000
APP_NAME=kavanest-client

yarn install && yarn build && docker build -f ./Dockerfile.kube -t $APP_NAME . && docker tag $APP_NAME $REGISTRY_IP/$APP_NAME && docker push $REGISTRY_IP/$APP_NAME && rm -r build
