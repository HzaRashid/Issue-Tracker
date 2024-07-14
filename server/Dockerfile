# FROM node:18.20.3
FROM arm64v8/node:18.20.4-alpine3.20


WORKDIR /server

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

COPY . .

ENV PORT=8080

EXPOSE 8080
CMD [ "npm", "start" ]