import { getRepository } from 'typeorm';
import { Board } from './board.entity';
// const { removeSeccessTasks} = require('../tasks/tasks.controller');

const getAll = async() => {
    const BoardRepository = await getRepository(Board);
    const boards = await BoardRepository.find();
    return boards
};
const getById = async(id) => {
    const BoardRepository = getRepository(Board);
    const FindBoard = await BoardRepository.findOne(id);
    return FindBoard;
};
const create = async({title, columns}) => {
    const board = {
        title,
        columns
    }
    const BoardRepository = getRepository(Board);
    const newBoard = BoardRepository.create(board);
    const saveBoard = BoardRepository.save(newBoard);
    return saveBoard
}
const update =  async({title, columns}, id) => {
    const BoardRepository = getRepository(Board);
    const FindBoardRes = await getById(id);
    const UpdateRes = await BoardRepository.update(FindBoardRes, {title, columns});
    return UpdateRes.raw;
}
const remove = async(id) => {
    const BoardRepository = getRepository(Board);
    await removeSeccessTasksBoardId(id)
    const deletRes = await BoardRepository.delete({ id });
    return deletRes
}

export { getAll, getById, create, update, remove};

