# Етап 1: Встановлення залежностей
FROM node:20-alpine AS build
# Важливо для sharp та інших бінарних модулів
RUN apk update && apk add --no-cache build-base gcc autoconf automake libtool make python3 vips-dev
WORKDIR /opt/app
COPY package.json package-lock.json ./
# Встановлюємо все, включаючи devDependencies для збірки
RUN npm ci

COPY . .
RUN npm run build

# Етап 2: Фінальний образ (Runtime)
FROM node:20-alpine
# Додаємо vips-dev для роботи з картинками (sharp)
RUN apk add --no-cache vips-dev
WORKDIR /opt/app
ENV NODE_ENV=production

# Копіюємо тільки те, що реально потрібно для запуску
COPY --from=build /opt/app/package.json /opt/app/package-lock.json ./
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/public ./public
COPY --from=build /opt/app/dist ./dist

# Створюємо безпечного користувача
RUN addgroup -g 1001 -S node && \
    adduser -u 1001 -S strapi -G node && \
    chown -R strapi:node /opt/app
USER strapi

EXPOSE 1337
CMD ["npm", "run", "start"]