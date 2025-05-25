# Этап 1: Установка зависимостей и сборка приложения
FROM node:18-alpine AS builder
WORKDIR /app

# Устанавливаем libc6-compat для некоторых нативных зависимостей, если они понадобятся
# RUN apk add --no-cache libc6-compat

# Копируем файлы с описанием зависимостей
COPY package.json yarn.lock ./

# Устанавливаем зависимости с помощью Yarn
# Используем --frozen-lockfile для обеспечения консистентности с yarn.lock
RUN yarn install --frozen-lockfile

# Копируем остальной код приложения
COPY . .

# Отключаем телеметрию Next.js во время сборки
ENV NEXT_TELEMETRY_DISABLED=1

# Собираем приложение Next.js
RUN yarn build

# Этап 2: Создание производственного образа
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Отключаем телеметрию Next.js во время выполнения
ENV NEXT_TELEMETRY_DISABLED=1

# Создаем группу и пользователя для запуска приложения от имени non-root пользователя
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Копируем вывод standalone сборки из этапа builder
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
# Копируем папку public
COPY --from=builder --chown=nextjs:nextjs /app/public ./public
# Копируем статические ассеты из .next/static
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static

# Устанавливаем пользователя
USER nextjs

# Открываем порт, на котором будет работать приложение Next.js (по умолчанию 3000)
EXPOSE 3000

# Команда для запуска Next.js приложения в standalone режиме
# Next.js standalone сервер по умолчанию слушает на 0.0.0.0, что подходит для Docker.
# Порт может быть переопределен переменной окружения PORT.
CMD ["node", "server.js"]