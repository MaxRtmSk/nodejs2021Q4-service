import usersService from './user.service';

const getUsers = async (_, res) => {
    const users = await usersService.getAll();
    res.send(users);
};

const getUser = async (req, res) => {
    const {id} = req.params;
    const user = await usersService.getById(id);
    if(!user) res.status(404)
    res.send(user);
};

const addUser = async (req, res) => {
    const {name, login, password} = req.body;
    const result = await usersService.create({name, login, password});
    res.code(201).send(result);
};

const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, login, password} = req.body;

    const findUser = await usersService.getById(id);
    if(!findUser) return res.status(404).send({message: `User ${id} not found`});

    const result = await usersService.update({name, login, password}, id)
    return res.send(result)
};

const deleteUser = async (req, res) => {
    const {id} = req.params;

    const findUser = await usersService.getById(id);
    if(!findUser) return res.status(404).send({message: `User ${id} not found`});

    await usersService.remove(id);

    return res.send({message: `User ${id} has been removed`})
};

export {getUser, getUsers, addUser, updateUser, deleteUser};