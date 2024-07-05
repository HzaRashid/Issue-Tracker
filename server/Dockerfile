FROM node:18.20.3

WORKDIR /server

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]