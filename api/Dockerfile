FROM node:15.14.0-alpine

WORKDIR '/api'

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]