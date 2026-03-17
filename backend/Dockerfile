FROM node:20-alpine

WORKDIR /opt/app

ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 1337

CMD ["npm", "run", "start"]