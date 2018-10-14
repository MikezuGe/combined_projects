#!/bin/bash

cd /srv/share

git add .
git reset --hard
git pull

npm install --only=production

ps -aux | grep [n]ode | awk '{print $2}' | xargs kill
nohup node index.js &> /var/log/nodesrv.log &
