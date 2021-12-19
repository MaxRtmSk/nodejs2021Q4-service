export interface IUser {
  name: string,
  login: string,
  id: string,
  password: string
}

let USERS: IUser[] = [];

const getAll = (): IUser[] => USERS;

const getById =  (id: string): IUser | undefined => USERS.find((user) => user.id === id);

const create =  (user: IUser): IUser | undefined => {
  USERS = [...USERS, user];
  return getById(user.id);
};

const update =  ({name, login, password}: Partial<IUser>, id: string): IUser | null => {
  const findUser = USERS.find((user) => user.id === id);

  if(!findUser) return null

  if (name) 
      findUser.name = name;
  if (login) 
      findUser.login = login; 
  if (password) 
      findUser.password = password;

  return findUser;
};

const remove = (id: string): void => {
  USERS = USERS.filter(user => user.id !== id);
};

export default { getAll, create, getById, update, remove};
