import { getRepository } from 'typeorm';
import { User } from './user.entity';

const getAll = async() => {
    const UserRepository = await getRepository(User);
    const users = await UserRepository.find();
    return users
};
const getById = async(id) => {
    const UserRepository = getRepository(User);
    const FindUser = await UserRepository.findOne(id);
    return FindUser;
};
const create = async({name, login}) => {
    const user = {
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
    const UserRepository = getRepository(User);
    const FindUserRes = await getById(id);
    const UpdateRes = await UserRepository.update(FindUserRes, {name, login, password});
    return UpdateRes.raw;
}
const remove = async(id) => {
    const UserRepository = getRepository(User);
    const deletRes = await UserRepository.delete({ id });
    return deletRes
}

export default { getAll, getById, create, update, remove};
