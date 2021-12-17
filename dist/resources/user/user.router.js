const { getUsers, getUser, addUser, deleteUser, updateUser } = require("./user.controller");
const User = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: "string" },
        login: { type: "string" }
    }
};
const getUsersOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: User
            }
        }
    },
    handler: getUsers
};
const getUserOpts = {
    schema: {
        response: {
            200: User
        }
    },
    handler: getUser
};
const postUserOpts = {
    schema: {
        body: {
            type: 'object',
            require: ["password", "login", "name"],
            properties: {
                name: { type: 'string' },
                pasword: { type: 'string' },
                login: { type: 'string' },
            }
        },
        response: {
            201: User
        }
    },
    handler: addUser
};
const updateUserOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                pasword: { type: 'string' },
                login: { type: 'string' },
            }
        },
        response: {
            200: User
        }
    },
    handler: updateUser
};
const deleteUserOpts = {
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
    handler: deleteUser
};
function UserRoutes(fastify, options, done) {
    fastify.get('/users', getUsersOpts);
    fastify.get('/users/:id', getUserOpts);
    fastify.post('/users', postUserOpts);
    fastify.put('/users/:id', updateUserOpts);
    fastify.delete('/users/:id', deleteUserOpts);
    done();
}
module.exports = UserRoutes;
