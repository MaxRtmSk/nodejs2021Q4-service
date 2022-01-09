FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.jscn ./

RUN npm run install 

COPY . .

EXPOSE 4000

CMD ["node", "./dist/server.js" ]