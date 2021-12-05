const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/api-docs',
  swagger: {
    info: {title: 'REST API'}
  }
});
fastify.register(require('./resources/user/user.router'));
fastify.register(require('./resources/board/board.router'));
fastify.register(require('./resources/tasks/tasks.router'));

module.exports = fastify;
