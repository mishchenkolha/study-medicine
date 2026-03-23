#!/bin/sh
mkdir -p /opt/app/public/uploads
chown -R node:node /opt/app/public/uploads
exec npm run start
