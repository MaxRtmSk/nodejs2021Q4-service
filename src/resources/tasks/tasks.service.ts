import { getRepository } from 'typeorm';
import { Tasks } from './tasks.entity';

const getAll = async(boardId) => {
    const TasksRepository = await getRepository(Tasks);
    console.log('1111111111111111111111', boardId)
    const tasks = await TasksRepository.find({where: { board: boardId }});
    return tasks.length
};
const getById = async(id) => {
    const TasksRepository = getRepository(Tasks);
    const FindTasks = await TasksRepository.findOne(id);
    return FindTasks;
};
const create = async({title, columnId, userId, description, order, boardId}) => {
    const task = {
        title,
        order,
        userId,
        description,
        columnId,
        boardId
    }
    const TasksRepository = getRepository(Tasks);
    const newTasks = TasksRepository.create(task);
    const saveTasks = TasksRepository.save(newTasks);
    return saveTasks
}
const update =  async({title, columns}, id) => {
    const TasksRepository = getRepository(Tasks);
    const FindTasksRes = await getById(id);
    const UpdateRes = await TasksRepository.update(FindTasksRes, {title, columns});
    return UpdateRes.raw;
}
const remove = async(id) => {
    const TasksRepository = getRepository(Tasks);
    const deletRes = await TasksRepository.delete({ id });
    return deletRes
}

export { getAll, getById, create, update, remove};

