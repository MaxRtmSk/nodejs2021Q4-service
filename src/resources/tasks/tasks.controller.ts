const { randomUUID } = require('crypto')
// const Tasks = require('./task.model.js');
// const tasksService = require('./task.service');


let TASKS = [];
  

const getTasks = async (req, res) => {
    const {boardId} = req.params;
    const result = TASKS.filter((task) => task.boardId === boardId);
    res.send(result);
};

const getTask = async (req, res) => {
    const {taskId, boardId} = req.params;
    const findTask = TASKS.find((task) => task.id === taskId && task.boardId === boardId);
    if(!findTask) res.status(404).send({message: `Board ${taskId} not found`});
    if(findTask) res.send(findTask);
};

const addTask = async (req, res) => {
    const {boardId} = req.params;
    const {title, columnId, userId, description, order} = req.body;
    const task = {
        id: randomUUID(),
        title,
        order,
        userId,
        description,
        columnId,
        boardId
    };

    TASKS = [...TASKS, task]

    res.code(201).send(task);
};

const updateTask = async (req, res) => {
    const {taskId} = req.params;
    const {title, columns} = req.body;

    const findTasks = TASKS.find((task) => task.id === taskId);
    if(!findTasks) return res.status(404).send({message: `Tasks ${taskId} not found`});

    if (title) 
        findTasks.title = title;
    if (columns) 
        findTasks.login = columns; 

    return res.send(findTasks)
};

const deleteTask = async (req, res) => {
    const {taskId} = req.params;
    
    const findTasks = TASKS.find((task) => task.id === taskId);
    if(!findTasks) return res.status(404).send({message: `Tasks ${taskId} not found`});
    
    TASKS = TASKS.filter(task => task.id !== taskId);
    
    return res.send({message: `Tasks ${taskId} has been removed`})
};

const removeSeccessTasks = async (userId) => {
    TASKS = TASKS.map(task => task.userId === userId ? {...task, userId: null} : task);
  };
  
const removeSeccessTasksBoardId = async (boardId) => {
    TASKS = TASKS.map((task) =>
      task.boardId === boardId ? { ...task, userId: null, boardId: null } : task
    );
};

export {getTasks, getTask, addTask, updateTask, deleteTask, removeSeccessTasksBoardId, removeSeccessTasks};