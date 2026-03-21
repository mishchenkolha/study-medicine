# Етап 2: Фінальний образ (Runtime)
FROM node:20-alpine
# Додаємо vips-dev для роботи з картинками (sharp)
RUN apk add --no-cache vips-dev
WORKDIR /opt/app
ENV NODE_ENV=production

# Копіюємо тільки те, що реально потрібно
COPY --from=build /opt/app/package.json /opt/app/package-lock.json ./
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/public ./public
COPY --from=build /opt/app/dist ./dist

# Просто міняємо власника на вже існуючого користувача 'node'
RUN chown -R node:node /opt/app
USER node

EXPOSE 1337
CMD ["npm", "run", "start"]