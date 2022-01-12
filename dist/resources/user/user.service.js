"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const { randomUUID } = require('crypto');
const { removeSeccessTasks } = require('../tasks/tasks.controller');
const usersRepo = require('./user.memory.repository');
const getAll = () => usersRepo.getAll();
exports.getAll = getAll;
const getById = (id) => usersRepo.getById(id);
exports.getById = getById;
const create = ({ name, login }) => {
    const user = {
        id: randomUUID(),
        name,
        login,
    };
    const createUser = usersRepo.create(user);
    return createUser;
};
exports.create = create;
const update = ({ name, login, password }, id) => {
    const updateUser = usersRepo.update({ name, login, password }, id);
    return updateUser;
};
exports.update = update;
const remove = (id) => {
    removeSeccessTasks(id);
    const result = usersRepo.remove(id);
    return result;
};
exports.remove = remove;
