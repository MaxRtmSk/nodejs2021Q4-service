const tasksService = require('./tasks.service');

const getTasks = async (req, res) => {
    const {boardId} = req.params;
    const result = await tasksService.getAll(boardId);
    res.send(0);
};

const getTask = async (req, res) => {
    const {taskId} = req.params;
    const findTask = await tasksService.getById(taskId);
    if (!findTask) res.status(404).send({message: `Board ${taskId} not found`});
    if (findTask) res.send(findTask);
};

const addTask = async (req, res) => {
    const {boardId} = req.params;
    const {title, columnId, userId, description, order} = req.body;
    
    const result = await tasksService.create({boardId, title, columnId, userId, description, order});

    res.code(201).send(result);
};

const updateTask = async (req, res) => {
    const {taskId} = req.params;
    const {title, columns} = req.body;

    const findTasks = await tasksService.find(taskId)
    if(!findTasks) return res.status(404).send({message: `Tasks ${taskId} not found`});

    const result = await tasksService.update({title, columns}, taskId)

    return res.send(result);
};

const deleteTask = async (req, res) => {
    const {taskId} = req.params;
    
    const findTasks = await tasksService.find(taskId);
    if(!findTasks) return res.status(404).send({message: `Tasks ${taskId} not found`});
    
    await tasksService.remove(deleteTask)
    
    return res.send({message: `Tasks ${taskId} has been removed`})
};

export {getTasks, getTask, addTask, updateTask, deleteTask};