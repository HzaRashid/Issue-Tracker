FROM arm64v8/node

WORKDIR /server

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

COPY . .

ENV PORT=8080

EXPOSE 8080
CMD [ "npm", "start" ]