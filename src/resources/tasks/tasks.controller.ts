import tasksService from './tasks.service';

const getTasks = async (req) => {
    const {boardId} = req.params;
    const result = await tasksService.getAll(boardId);
    if(result.length === 0) return ([{}]);
    return (result);
};

const getTask = async (req, res) => {
    const {taskId} = req.params;
    const findTask = await tasksService.getById(taskId);
    if (!findTask) res.status(404).send({message: `Tasks ${taskId} not found`});
    if (findTask){
        const {board: boardId, user: userId, ...task} = findTask;
        res.send({ boardId, userId,...task})
    };
};

const addTask = async (req, res) => {
    const {boardId} = req.params;
    const {title, columnId, userId, description, order} = req.body;
    
    const result = await tasksService.create({boardId, title, columnId, userId, description, order});

    res.code(201).send(result);
};

const updateTask = async (req, res) => {
    const {taskId} = req.params;
    const {title, columnId, userId, description, order} = req.body;
    const findTasks = await tasksService.getById(taskId)
    if(!findTasks) return res.status(404).send({message: `Tasks ${taskId} not found`});

    const result = await tasksService.update({title, columnId, userId, description, order}, taskId)
    result.order=0
    result.columnId=null;
    
    
    return res.send(result);
};

const deleteTask = async (req, res) => {
    const {taskId} = req.params;
    
    const findTasks = await tasksService.getById(taskId);
    if(!findTasks) return res.status(404).send({message: `Tasks ${taskId} not found`});
    
    await tasksService.remove(taskId)
    
    return res.send({message: `Tasks ${taskId} has been removed`})
};

export {getTasks, getTask, addTask, updateTask, deleteTask};