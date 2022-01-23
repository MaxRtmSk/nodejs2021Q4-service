import { getRepository } from 'typeorm';
import { Tasks } from './tasks.entity';

const getAll = async(boardId) => {
    const TasksRepository = await getRepository(Tasks);
    const tasksRes = await TasksRepository.find({where: { board: boardId }, loadRelationIds: true});
    const tasks = tasksRes.map(({board, user,...task})=>({boardId: board, userId: user, ...task}))
    return tasks
};
const getById = async(id) => {
    const TasksRepository = await getRepository(Tasks);
    const FindTask = await TasksRepository.findOne(id, {loadRelationIds: true});
    return FindTask;
};
const create = async({title, columnId, userId, description, order, boardId}) => {
    const task = {
        title,
        order,
        user: userId,
        description,
        columnId,
        board: boardId
    }
    const TasksRepository = getRepository(Tasks);
    const newTasks = await TasksRepository.create(task);
    const {board, user, ...saveTask} = await TasksRepository.save(newTasks);
    
    return {...saveTask, boardId: board, userId: user}
}
const update =  async({title, columnId, userId, description, order}, id) => {
    const TasksRepository = await getRepository(Tasks);
    await TasksRepository.update({id}, {title, ...(columnId && {columnId}), ...(userId && {user: userId}), description, order});
    const { ...updateTask} = await getById(id);
    return { ...updateTask};
}
const remove = async(id) => {
    const TasksRepository = getRepository(Tasks);
    const deletRes = await TasksRepository.delete({ id });
    return deletRes
}

export default { getAll, getById, create, update, remove};

