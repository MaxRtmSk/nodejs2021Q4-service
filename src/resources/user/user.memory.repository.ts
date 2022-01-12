let USERS = [];

const getAll =  () => USERS;
const getById =  (id) => USERS.find((user) => user.id === id);
const create =  (user) => {
  USERS = [...USERS, user];
  const findUser = getById(user.id);
  return findUser
};
const update =  ({name, login, password}, id) => {
  const findUser = USERS.find((user) => user.id === id);
  
  if (name) 
      findUser.name = name;
  if (login) 
      findUser.login = login; 
  if (password) 
      findUser.password = password;

  return findUser;
};

const remove = (id) => {
  USERS = USERS.filter(user => user.id !== id);
};

export { getAll, create, getById, update, remove};
