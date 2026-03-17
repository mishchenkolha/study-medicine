FROM node:20-alpine
# Встановлюємо залежності для збірки node-gyp
RUN apk update && apk add --no-cache build-base gcc autoconf automake libtool make python3
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 1337
CMD npm run start
# Для продакшену змініть на [npm, run, start]