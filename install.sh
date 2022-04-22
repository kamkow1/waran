#!/bin/sh

build = $1

if [ -d $build ]
then
    cd $build && npm install express@latest
else
    echo "could not find path"
fi