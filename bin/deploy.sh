#!/bin/sh
APP_NAME=kavanest-client

clear && cd helm && helm upgrade $APP_NAME . --namespace kavanest --create-namespace

EXITCODE=$?
if [ "$EXITCODE" -ne "0" ];
then
echo "
The above error created because the deployment doesn't exist.
Creating deployment now...
"
helm install $APP_NAME . --namespace kavanest --create-namespace
fi