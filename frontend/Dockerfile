FROM node:20-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /opt/app

# Залишаємо вимкнення SWC, бо саме воно рятує від BMI2
ENV NEXT_SWC_DISABLED=1

COPY package*.json ./
RUN npm install

# Заглушка обов'язкова, щоб не було паніки
RUN mkdir -p node_modules/@next/swc-linux-x64-musl
RUN touch node_modules/@next/swc-linux-x64-musl/next-swc.linux-x64-musl.node
RUN echo '{"name": "@next/swc-linux-x64-musl", "main": "next-swc.linux-x64-musl.node"}' > node_modules/@next/swc-linux-x64-musl/package.json

COPY . .

ARG DOMAIN_URL
ARG NEXT_PUBLIC_DOMAIN_URL

ENV DOMAIN_URL=$DOMAIN_URL
ENV NEXT_PUBLIC_DOMAIN_URL=$NEXT_PUBLIC_DOMAIN_URL

RUN echo "NEXT_PUBLIC_DOMAIN_URL=$NEXT_PUBLIC_DOMAIN_URL"
RUN echo "DOMAIN_URL=$DOMAIN_URL"

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]