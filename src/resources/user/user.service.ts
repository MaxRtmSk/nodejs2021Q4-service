import { getRepository } from 'typeorm';
import { User } from './user.entity';
const { randomUUID } = require('crypto');
const { removeSeccessTasks} = require('../tasks/tasks.controller');
const usersRepo = require('./user.memory.repository');

const getAll = async() => {
    const UserRepository = await getRepository(User);
    const users = await UserRepository.find();
    console.log('1111111111', users)
    return users
};
const getById = async(id) => {
    const UserRepository = getRepository(User);
    const FindUser = await UserRepository.findOne(id);
    return FindUser;
};
const create = async({name, login, password}) => {
    console.log('1111111111111', name, login, password);
    const user = {
        id: randomUUID(),
        name,
        login,
        password: '1'
    }
    const UserRepository = getRepository(User);
    const newUser = UserRepository.create(user);
    const saveUser = UserRepository.save(newUser);
    return saveUser
}
const update =  async({name, login, password}, id) => {
    console.log(name, login, password)
    const UserRepository = getRepository(User);
    const FindUserRes = await getById(id);
    const UpdateRes = await UserRepository.update(FindUserRes, {name, login, password});
    return UpdateRes.raw;
}
const remove = async(id) => {
    const UserRepository = getRepository(User);
    const deletRes = await UserRepository.delete({ id });
    removeSeccessTasks(id);
    return deletRes
}

export { getAll, getById, create, update, remove};
