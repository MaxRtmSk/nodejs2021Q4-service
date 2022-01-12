"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const userRoute = require('./resources/user/user.router');
const boardRoute = require('./resources/board/board.router');
const tasksRoute = require('./resources/tasks/tasks.router');
const server = (0, fastify_1.default)({ logger: true });
server.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/api-docs',
    swagger: {
        info: { title: 'REST API' }
    }
});
server.register(userRoute);
server.register(boardRoute);
server.register(tasksRoute);
exports.default = server;
