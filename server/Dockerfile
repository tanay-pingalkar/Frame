FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install yarn

RUN yarn

COPY . .

COPY .docker.env ./.env

RUN yarn build

EXPOSE 8080

CMD ["node","dist/src/server.js"]