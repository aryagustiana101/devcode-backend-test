FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
COPY .env.prod ./.env
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN npx prisma generate
EXPOSE 3030
CMD [ "npm", "run", "start:migrate" ]