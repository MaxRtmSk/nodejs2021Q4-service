import fastify from 'fastify';
import { UserRoutes } from './resources/user/user.router';
import boardRoute from './resources/board/board.router';
import tasksRoute from './resources/tasks/tasks.router';


const server = fastify({ logger: true });

server.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/api-docs',
  swagger: {
    info: {title: 'REST API'}
  }
});

server.register(UserRoutes);
server.register(boardRoute);
server.register(tasksRoute);

export default server;
