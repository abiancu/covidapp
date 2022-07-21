# syntax=docker/dockerfile:1

FROM node:current-alpine

ENV NOVE_ENV=production

WORKDIR /app

COPY . /app/

RUN npm install

# Command to execute container
ENTRYPOINT [ "npm", "server.js" ]