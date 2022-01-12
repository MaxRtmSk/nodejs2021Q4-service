"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getById = exports.create = exports.getAll = void 0;
const USERS = [];
const getAll = async () => USERS;
exports.getAll = getAll;
const create = async (user) => USERS.push(user);
exports.create = create;
const getById = async (id) => USERS.find((user) => user.id === id);
exports.getById = getById;
const update = async (id, updateUser) => {
    USERS.forEach((user, index) => {
        if (user.id === id) {
            USERS[index].name = updateUser.name;
            USERS[index].login = updateUser.login;
            USERS[index].password = updateUser.password;
        }
    });
};
exports.update = update;
