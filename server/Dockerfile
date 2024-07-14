FROM --platform=arm64/v8 node:18.20.3

WORKDIR /server

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

COPY . .

ENV PORT=8080

EXPOSE 8080
CMD [ "npm", "start" ]