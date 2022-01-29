import fastify from 'fastify';
import fastifyAuth from 'fastify-auth';


import { UserRoutes } from './resources/user/user.router';
import boardRoute from './resources/board/board.router';
import tasksRoute from './resources/tasks/tasks.router';
import AuthRoute from './resources/auth/auth.router';

import AuthController from './resources/auth/auth.controller';


const server = fastify({ logger: true });

server.decorate('verifyToken', AuthController.verifyToken);

server.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/api-docs',
  swagger: {
    info: {title: 'REST API'}
  }
});

server.register(AuthRoute);
server.register(fastifyAuth)
server.register(boardRoute);
server.register(tasksRoute);
server.register(UserRoutes);

export default server;
