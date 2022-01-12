"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.getUsers = exports.getUser = void 0;
const usersService = require('./user.service');
const getUsers = async (req, res) => {
    const users = usersService.getAll();
    res.send(users);
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    const { id } = req.params;
    const user = usersService.getById(id);
    if (!user)
        res.status(404);
    res.send(user);
};
exports.getUser = getUser;
const addUser = async (req, res) => {
    const { name, login } = req.body;
    const result = usersService.create({ name, login });
    res.code(201).send(result);
};
exports.addUser = addUser;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const findUser = usersService.getById(id);
    if (!findUser)
        return res.status(404).send({ message: `User ${id} not found` });
    const result = usersService.update({ name, login, password }, id);
    return res.send(result);
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const findUser = usersService.getById(id);
    if (!findUser)
        return res.status(404).send({ message: `User ${id} not found` });
    usersService.remove(id);
    return res.send({ message: `User ${id} has been removed` });
};
exports.deleteUser = deleteUser;
