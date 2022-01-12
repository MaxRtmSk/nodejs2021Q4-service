"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.create = exports.getAll = void 0;
let USERS = [];
const getAll = () => USERS;
exports.getAll = getAll;
const getById = (id) => USERS.find((user) => user.id === id);
exports.getById = getById;
const create = (user) => {
    USERS = [...USERS, user];
    const findUser = getById(user.id);
    return findUser;
};
exports.create = create;
const update = ({ name, login, password }, id) => {
    const findUser = USERS.find((user) => user.id === id);
    if (name)
        findUser.name = name;
    if (login)
        findUser.login = login;
    if (password)
        findUser.password = password;
    return findUser;
};
exports.update = update;
const remove = (id) => {
    USERS = USERS.filter(user => user.id !== id);
};
exports.remove = remove;
