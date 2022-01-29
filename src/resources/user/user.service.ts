import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { User } from './user.entity';


const getAll = async() => {
    const users = await getRepository(User).find();
    console.log('uuuuuuu', users)
    return users
};
const getById = async(id) => {
    const UserRepository = getRepository(User);
    const FindUser = await UserRepository.findOne(id);
    return FindUser;
};
const getByLogin = async(login) => {
    const FindUserResult = await getRepository(User).findOne({where: {login}});
    return FindUserResult;
}
const create = async({name, login, password}) => {
    const hashPassword = await bcrypt.hash(password, 6);
    const user = {
        name,
        login,
        password: hashPassword
    };
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

export default { getAll, getById, getByLogin, create, update, remove};
