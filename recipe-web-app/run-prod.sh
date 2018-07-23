#!/usr/bin/env bash

currDir=$(pwd)
rm -rf ./dist/*
ng build
cp -fR ./dist/* ./server/static/
cd ./server/app/
node server.js
cd ${currDir}
