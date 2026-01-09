FROM node:alpine3.11

RUN apk add curl
RUN apk add mongodb-tools
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
EXPOSE 80
CMD [ "npm", "run", "dev" ]