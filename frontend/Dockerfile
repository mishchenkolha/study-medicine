FROM node:20-alpine

WORKDIR /opt/app

# Вказуємо, що ми в продакшені
ENV NODE_ENV=production

# Копіюємо залежності (без dev-пакетів для швидкості)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Копіюємо ваш готовий локальний білд (.next), public та інші файли
COPY . .

# Railway автоматично підхопить цей порт, якщо він вказаний у налаштуваннях сервісу
ENV PORT 3000
EXPOSE 3000

# Запускаємо через масив для коректної обробки сигналів завершення
CMD ["npm", "run", "start"]