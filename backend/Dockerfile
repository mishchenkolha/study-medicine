# Stage 1: Build
FROM node:20-alpine AS build
# Встановлюємо залежності для нативних модулів
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git

WORKDIR /opt/app
COPY package.json package-lock.json ./
# Встановлюємо ВСІ залежності для білду
RUN npm ci

COPY . .
# Збільшуємо пам'ять для Node під час білду
ENV NODE_OPTIONS=--max-old-space-size=2048
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine
RUN apk add --no-cache vips-dev
WORKDIR /opt/app

# Копіюємо тільки необхідне
COPY --from=build /opt/app/package.json /opt/app/package-lock.json ./
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/public ./public

# Встановлюємо production змінні
ENV NODE_ENV=production
EXPOSE 1337

CMD ["npm", "run", "start"]