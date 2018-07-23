#!/bin/bash -x

# original script
#rm -f ../static/images/*
#cp emptybowl.jpg ../static/images
#cp recipes.json.start recipes.json

rm -f ./server/static/images/*
cp ./server/app/emptybowl.jpg ./server/static/images
cp ./server/app/recipes.json.start ./server/app/recipes.json
