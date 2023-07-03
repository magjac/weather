#!/usr/bin/env bash

set -eux

(cd front-end && npm install && npm run build)
scp -rp -P 7822 front-end/build/* magjac.com:www-test/weather
scp -rp -P 7822 server.py magjac.com:www/weather
ssh -p 7822 magjac.com systemctl --user daemon-reload
ssh -p 7822 magjac.com systemctl --user restart weather.service
