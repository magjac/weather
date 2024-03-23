#!/usr/bin/env bash

set -eux

remote_www_dir="www"

if [[ $# != 0 ]]; then
  if [[ $1 = "--test" ]]; then
    remote_www_dir="www-test"
  else
    echo "Error: Uknown option: $1" 1>&2
    echo "Usage: $0 [--test]" 1>&2
    exit 1
  fi
fi
remote_dir="${remote_www_dir}/weather"

(cd front-end && npm install && npm run build)
scp -rp -P 7822 front-end/build/* magjac.com:${remote_dir}
scp -rp -P 7822 server.py magjac.com:${remote_dir}
ssh -p 7822 magjac.com systemctl --user daemon-reload
ssh -p 7822 magjac.com systemctl --user restart weather.service
