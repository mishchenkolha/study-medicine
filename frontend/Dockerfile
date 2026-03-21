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

# ВИДАЛЯЄМО experimental-specifier-resolution, він ламає імпорти в TS
# ENV NODE_OPTIONS="--experimental-specifier-resolution=node" <-- ПРИБРАЛИ

EXPOSE 3000
CMD ["npm", "run", "dev"]