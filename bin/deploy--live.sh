#!/bin/sh

clear && cd helm && \
helm upgrade kavanest-client . \
--install \
--namespace kavanest \
-f values/live.yaml
