import fastify from 'fastify';

const userRoute = require('./resources/user/user.router');
const boardRoute = require('./resources/board/board.router');
const tasksRoute = require('./resources/tasks/tasks.router');


const server = fastify({ logger: true });

server.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/api-docs',
  swagger: {
    info: {title: 'REST API'}
  }
});
server.register(userRoute);
server.register(boardRoute);
server.register(tasksRoute);

export default server;
