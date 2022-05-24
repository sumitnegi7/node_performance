FROM node:lts-alpine

WORKDIR /node-app

COPY . .

RUN npm install --only=production

USER node

CMD ["npm", "start"]

EXPOSE 5000