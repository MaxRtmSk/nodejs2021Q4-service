const { randomUUID } = require('crypto')
// const User = require('./user.model.js');
// const usersService = require('./user.service');


let USERS = [
    {
    id: '1',
    name: '2',
    password: '3'
  }, 
  {
    id: '2',
    name: '2',
    password: '3'
  }
  ];
  

const getUsers = async (req, res) => {
    res.send(USERS);
};

const getUser = async (req, res) => {
    const {id} = req.params;
    const findUser = USERS.find((user) => user.id === id);
    res.send(findUser);
};

const addUser = async (req, res) => {
    const {name, login} = req.body;
    const user = {
        id: randomUUID(),
        name,
        login,
    };

    USERS = [...USERS, user]

    res.code(201).send(user);
};

const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, login, password} = req.body;

    const findUser = USERS.find((user) => user.id === id);
    if(!findUser) return res.status(404).send({message: `User ${id} not found`});

    if (name) 
        findUser.name = name;
    if (login) 
        findUser.login = login; 
    if (password) 
        findUser.password = password;

    return res.send(findUser)
};

const deleteUser = async (req, res) => {
    const {id} = req.params;

    const findUser = USERS.find((user) => user.id === id);
    if(!findUser) return res.status(404).send({message: `User ${id} not found`});

    USERS = USERS.filter(user => user.id !== id);
    return res.send({message: `User ${id} has been removed`})
};

module.exports = {getUser, getUsers, addUser, updateUser, deleteUser};