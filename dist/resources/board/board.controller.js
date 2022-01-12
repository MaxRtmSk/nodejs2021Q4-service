const { randomUUID } = require('crypto');
const { removeSeccessTasksBoardId } = require('../tasks/tasks.controller');
// const Board = require('./board.model.js');
// const boardsService = require('./board.service');
let BOARDS = [];
const getBoards = async (req, res) => {
    res.send(BOARDS);
};
const getBoard = async (req, res) => {
    const { boardId } = req.params;
    const findBoard = BOARDS.find((board) => board.id === boardId);
    if (!findBoard)
        res.status(404).send({ message: `Board ${boardId} not found` });
    if (findBoard)
        res.send(findBoard);
};
const addBoard = async (req, res) => {
    const { title, columns } = req.body;
    const board = {
        id: randomUUID(),
        title,
        columns,
    };
    BOARDS = [...BOARDS, board];
    res.code(201).send(board);
};
const updateBoard = async (req, res) => {
    const { boardId } = req.params;
    const { title, columns } = req.body;
    const findBoard = BOARDS.find((board) => board.id === boardId);
    if (!findBoard)
        return res.status(404).send({ message: `Board ${boardId} not found` });
    if (title)
        findBoard.title = title;
    if (columns)
        findBoard.login = columns;
    return res.send(findBoard);
};
const deleteBoard = async (req, res) => {
    const { boardId } = req.params;
    const findBoard = BOARDS.find((board) => board.id === boardId);
    if (findBoard) {
        await removeSeccessTasksBoardId(boardId);
        BOARDS = BOARDS.filter(board => board.id !== boardId);
        res.send({ message: `Board ${boardId} has been removed` });
    }
    if (!findBoard)
        res.status(404).send({ message: `Board ${boardId} not found` });
};
module.exports = { getBoard, getBoards, addBoard, updateBoard, deleteBoard };
