import { randomUUID } from 'crypto';

import usersRepo, { IUser } from './user.memory.repository';
import { removeSuccessTasks } from '../tasks/tasks.router';



const getAll = () => usersRepo.getAll();

const getById =  (id: string) => usersRepo.getById(id);

const create =  ({name, login, password}: Omit<IUser, 'id'>) => {
    const user: IUser = {
        id: randomUUID(),
        name,
        login,
        password
    };
    const createUser = usersRepo.create(user);
    return createUser;
};

const update =  ({name, login, password}: Partial<IUser>, id: string) => {
    const updateUser = usersRepo.update({name, login, password}, id);
    return updateUser;
};

const remove = (id: string) => {
    removeSuccessTasks(id);
    const result = usersRepo.remove(id);
    return result
};

export default { getAll, getById, create, update, remove};
