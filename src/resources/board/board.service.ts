import { getRepository } from 'typeorm';
import { Board } from './board.entity';

const getAll = async() => {
    const BoardRepository = await getRepository(Board);
    const boards = await BoardRepository.find();
    return boards
};
const getById = async(id) => {
    const FindBoard = await getRepository(Board).findOne(id);
    return FindBoard;
};
const create = async({title, columns}) => {
    const board = {
        title,
        columns
    }
    const BoardRepository = await getRepository(Board);
    const newBoard = await BoardRepository.create(board);
    const saveBoard =  await BoardRepository.save(newBoard);
    return saveBoard
}
const update =  async({title, columns}, id) => {
    const BoardRepository =  await getRepository(Board);
    const UpdateRes = await BoardRepository.update({id}, {title, ...(columns && {columns})});
    return UpdateRes.raw;
}
const remove = async(id) => {
    const BoardRepository = await getRepository(Board);
    const deletRes = await BoardRepository.delete({ id });
    return deletRes
}

export default { getAll, getById, create, update, remove};

