FROM node:alpine3.11

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN apk add curl

CMD [ "npm", "start" ]