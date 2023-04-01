#!/bin/bash

if [[ $# -eq 0 ]] ; then
    echo 'Missing version'
    exit 1
fi

REPO=jeffbla/expressjs
TAG="$1"
IMAGE=${REPO}:${TAG}

echo "docker build -t ${IMAGE} ."
docker build --build-arg CONT_IMG_VER=${TAG} -t ${IMAGE} . &> docker-build.log

echo "Tagging latest" ${IMAGE} 

echo "docker tag ${IMAGE} ${REPO}:latest"
docker tag ${IMAGE} ${REPO}:latest

read -p 'remove dangling images(yes/no): ' rm
if [[ $rm == 'yes' ]]
then
    echo "removing dangling images"
    docker rmi $(docker images -f "dangling=true" -q)
fi

echo "done building" ${IMAGE}
