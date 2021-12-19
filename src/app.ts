import { Server, IncomingMessage, ServerResponse } from 'http';
import fastify, {FastifyInstance} from 'fastify';


import userRoutes from './resources/user/user.router';

const boardRoute = require('./resources/board/board.router');
const tasksRoute = require('./resources/tasks/tasks.router');


const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: true });

server.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/api-docs',
  swagger: {
    info: {title: 'REST API'}
  }
});

server.register(userRoutes);
server.register(boardRoute);
server.register(tasksRoute);

export default server;
