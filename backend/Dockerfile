FROM node:20-alpine

# Встановлюємо системні залежності (потрібні і для білду, і для роботи)
RUN apk add --no-cache vips-dev build-base gcc autoconf automake libtool make python3

WORKDIR /opt/app
ENV NODE_ENV=production

# Копіюємо залежності
COPY package*.json ./
RUN npm install --omit=dev

# Копіюємо код і білдимо
COPY . .
RUN npm run build

RUN chown -R node:node /opt/app
# USER node

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 1337
CMD ["/entrypoint.sh"]