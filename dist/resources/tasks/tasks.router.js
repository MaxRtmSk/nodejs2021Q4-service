"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { getTasks, getTask, addTask, deleteTask, updateTask } = require("./tasks.controller");
const Task = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: "string" },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: ["string", "null"] },
        boardId: { type: ['string', "null"] },
        columnId: { type: ["null"] }
    }
};
const getTasksOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Task
            }
        }
    },
    handler: getTasks
};
const getTaskOpts = {
    schema: {
        response: {
            200: Task
        }
    },
    handler: getTask
};
const postTaskOpts = {
    schema: {
        body: {
            type: 'object',
            require: ["title", "order", "description", "userId", "boardId", "columnId"],
            properties: {
                title: { type: "string" },
                order: { type: 'string' },
                description: { type: 'string' },
                userId: { type: ['string', "null"] },
                boardId: { type: 'string' },
                columnId: { type: 'string' }
            }
        },
        response: {
            201: Task
        }
    },
    handler: addTask
};
const updateTaskOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                title: { type: "string" },
                order: { type: 'string' },
                description: { type: 'string' },
                userId: { type: 'string' },
                boardId: { type: 'string' },
                columnId: { type: 'string' }
            }
        },
        response: {
            200: Task
        }
    },
    handler: updateTask
};
const deleteTaskOpts = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" }
                }
            },
            404: {
                type: "object",
                properties: {
                    message: { type: "string" }
                }
            }
        }
    },
    handler: deleteTask
};
function TaskRoutes(fastify, options, done) {
    fastify.get('/boards/:boardId/tasks', getTasksOpts);
    fastify.get('/boards/:boardId/tasks/:taskId', getTaskOpts);
    fastify.post('/boards/:boardId/tasks', postTaskOpts);
    fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOpts);
    fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);
    done();
}
exports.default = TaskRoutes;
