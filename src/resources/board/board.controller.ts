const { randomUUID } = require('crypto');
const { removeSeccessTasksBoardId } = require('../tasks/tasks.controller');
const boardsService = require('./board.service');

  

const getBoards = async (req, res) => {
    const boards = await boardsService.getAll();
    res.send(boards);
};

const getBoard = async (req, res) => {
    const {boardId} = req.params;
    const board = await boardsService.getById(boardId);
    if(!board) res.status(404).send({message: `Board ${boardId} not found`});
    if(board) res.send(board);
};

const addBoard = async (req, res) => {
    const {title, columns} = req.body;
    const result = await boardsService.create({title, columns});
    res.code(201).send(result);
};

const updateBoard = async (req, res) => {
    const {boardId} = req.params;
    const {title, columns} = req.body;

    const findBoard = await boardsService.getById(boardId);
    if(!findBoard) return res.status(404).send({message: `Board ${boardId} not found`});

    const result = await boardsService.update({title, ...(columns && {columns})}, boardId)
    return res.send(result)
};

const deleteBoard = async (req, res) => {
    const {boardId} = req.params;

    const findBoard = await boardsService.getById(boardId);
    if(!findBoard) return res.status(404).send({message: `Board ${boardId} not found`});
    
    await boardsService.remove(boardId)
    
    return res.send({message: `Board ${boardId} has been removed`})
};

module.exports = {getBoard, getBoards, addBoard, updateBoard, deleteBoard};