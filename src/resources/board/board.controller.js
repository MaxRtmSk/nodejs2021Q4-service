const { randomUUID } = require('crypto')
// const Board = require('./board.model.js');
// const boardsService = require('./board.service');


let BOARDS = [
    {
        "id": "ea347c9a-f769-4b4d-b687-015f5f5ec771",
        "title": "Autotest board",
        "columns": 
        [
        {
          "order": 1,
          "title": "Backlog",
        }, 
        {
         "order": 2,
         "title": "Sprint",
        },
        ],
    }
    ];
  

const getBoards = async (req, res) => {
    res.send(BOARDS);
};

const getBoard = async (req, res) => {
    const {boardId} = req.params;
    const findBoard = BOARDS.find((board) => board.id === boardId);
    res.send(findBoard);
};

const addBoard = async (req, res) => {
    const {title, columns} = req.body;
    const board = {
        id: randomUUID(),
        title,
        columns,
    };

    BOARDS = [...BOARDS, board]

    res.code(201).send(board);
};

const updateBoard = async (req, res) => {
    const {boardId} = req.params;
    const {title, columns} = req.body;

    const findBoard = BOARDS.find((board) => board.id === boardId);
    if(!findBoard) return res.status(404).send({message: `Board ${boardId} not found`});

    if (title) 
        findBoard.title = title;
    if (columns) 
        findBoard.login = columns; 

    return res.send(findBoard)
};

const deleteBoard = async (req, res) => {
    const {boardId} = req.params;

    const findBoard = BOARDS.find((board) => board.id === boardId);
    if(!findBoard) return res.status(404).send({message: `Board ${boardId} not found`});

    BOARDS = BOARDS.filter(board => board.id !== boardId);
    return res.send({message: `Board ${boardId} has been removed`})
};

module.exports = {getBoard, getBoards, addBoard, updateBoard, deleteBoard};