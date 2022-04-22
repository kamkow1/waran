#!/bin/sh

build = $1

if [ -d $build ]
then
    cd $build && npm init -y
else
    echo "could not find path"
fi