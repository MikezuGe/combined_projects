#!/bin/bash

ps -aux | grep [n]ode | awk '{print $2}' | xargs kill

cd /srv/share

git reset --hard
git pull

npm install
npm update

node index.js
