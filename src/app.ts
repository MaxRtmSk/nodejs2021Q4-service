import { Server, IncomingMessage, ServerResponse } from 'http';
import fastify, { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifySwagger from 'fastify-swagger';

import userRoutes from './resources/user/user.router';
import boardRoute from './resources/board/board.router';
import tasksRoute from './resources/tasks/tasks.router';


const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: true });

const swaggerOptions = {
  exposeRoute: true,
  routePrefix: '/api-docs',
  swagger: {
    info: {title: 'REST API'}
  }
} as FastifyPluginOptions

server.register(fastifySwagger, swaggerOptions);

server.register(userRoutes);
server.register(boardRoute);
server.register(tasksRoute);

export default server;
