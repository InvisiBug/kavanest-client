#!/bin/sh

clear && cd helm && \
helm upgrade kavanest-test-client . \
--install \
--namespace kavanest-test \
-f values/test.yaml
