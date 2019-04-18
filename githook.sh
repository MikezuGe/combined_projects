#!/bin/bash

cd /srv/share

git add .
git reset --hard
git pull

yarn install --production --pure-lockfile

ps -aux | grep [n]ode | awk '{print $2}' | xargs -r kill
nohup node index.js &> /var/log/nodesrv.log &
