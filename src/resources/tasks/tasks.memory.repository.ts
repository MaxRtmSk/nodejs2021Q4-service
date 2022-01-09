const USERS = [];

const getAll = async () => USERS;
const create = async (user) => USERS.push(user);
const getById = async (id) => USERS.find((user) => user.id === id);
const update = async (id, updateUser) => {
  USERS.forEach((user, index) => {
    if (user.id === id) {
      USERS[index].name = updateUser.name;
      USERS[index].login = updateUser.login;
      USERS[index].password = updateUser.password;
    }
  });
};
// const remove = async(id) => {
  
//   const removeIndex = await USERS.map((user) => user.id).indexOf(id);
//   if (removeIndex === -1) {
//     return false
//   } 
//   await tasksRepo.removeSeccessTasks(id)
//   USERS.splice(removeIndex, 1);
//   return true
// };

export { getAll, create, getById, update };
