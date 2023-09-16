FROM node:18-alpine AS builder

ENV NODE_ENV=development

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "start:dev"]