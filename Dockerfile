FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 4000

COPY ./dist ./dist

CMD ["node", "dist/main"]