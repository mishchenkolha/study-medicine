# ---------- Build stage ----------
FROM node:20-alpine AS builder

RUN apk add --no-cache build-base gcc autoconf automake libtool make python3

WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build


# ---------- Production stage ----------
FROM node:20-alpine

WORKDIR /opt/app

ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=builder /opt/app/dist ./dist
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/package.json ./

EXPOSE 1337

CMD ["npm", "run", "start"]