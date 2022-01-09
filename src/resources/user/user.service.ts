const { randomUUID } = require('crypto');
const { removeSeccessTasks} = require('../tasks/tasks.controller');
const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById =  (id) => usersRepo.getById(id);
const create =  ({name, login}) => {
    const user = {
        id: randomUUID(),
        name,
        login,
    }
    const createUser = usersRepo.create(user);
    return createUser
}
const update =  ({name, login, password}, id) => {
    const updateUser = usersRepo.update({name, login, password}, id);
    return updateUser;
}
const remove = (id) => {
    removeSeccessTasks(id);
    const result = usersRepo.remove(id);
    return result
}

export { getAll, getById, create, update, remove};
