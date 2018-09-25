#!/bin/bash

ps -aux | grep [n]ode | awk '{print $2}' | xargs kill

cd /srv/share

git reset --hard
git pull

npm install
npm update

NODE_ENV=production nohup node index.js &> /var/log/nodesrv.log &
