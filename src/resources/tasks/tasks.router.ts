import { FastifyInstance, RegisterOptions } from 'fastify';
import { randomUUID } from 'crypto';

interface ITask {
  id: string,
  order: string,
  title: string,
  description: string,
  userId: string | null,
  boardId: string | null,
  columns?: []
  columnId: string | null,
}

let TASKS: ITask[] = [];

const Task = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    title: {type: "string"},
    order:  {type: 'number'},
    description:  {type: 'string'},
    userId:  {type: ["string", "null"]}, 
    boardId:  {type: ['string', "null"]},
    columnId: {type: ["null"]}
  }
}

const getTasksOpts = {
  schema: {
    response:{
      200: {
        type: 'array',
        items: Task
      }
    }
  }
}

const getTaskOpts = {
  schema: {
    response: {
      200: Task
    }
  }
}

const postTaskOpts = {
  schema: {
    body: {
        type: 'object',
        require: ["title", "order", "description", "userId", "boardId", "columnId"],
        properties: {
          title: {type: "string"},
          order:  {type: 'string'},
          description:  {type: 'string'},
          userId:  {type: ['string', "null"]}, 
          boardId:  {type: 'string'},
          columnId: {type: 'string'}
        }
    },
    response: {
      201: Task 
    }
  }
}

const updateTaskOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        title: {type: "string"},
        order:  {type: 'string'},
        description:  {type: 'string'},
        userId:  {type: 'string'}, 
        boardId:  {type: 'string'},
        columnId: {type: 'string'}
      }
    },
    response: {
      200: Task 
    }
  }
}

const deleteTaskOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: {type: "string"}
        }
      },
      404: {
        type: "object",
        properties: {
          message: {type: "string"}
        }
      }  
    }
  }
}

function TaskRoutes (fastify: FastifyInstance, options: RegisterOptions, done: () => void) {

  fastify.get<{Params: {boardId: string}}>(
    '/boards/:boardId/tasks',
    getTasksOpts,
    async (req, res) => {
    const {boardId} = req.params;
    const result = TASKS.filter((task) => task.boardId === boardId);
    res.send(result);
  });

  fastify.get<{Params: {boardId: string, taskId: string}}>(
    '/boards/:boardId/tasks/:taskId',
    getTaskOpts,
    async (req, res) => {
    const {taskId, boardId} = req.params;
    const findTask = TASKS.find((task) => task.id === taskId && task.boardId === boardId);
    if(!findTask) res.status(404).send({message: `Board ${taskId} not found`});
    if(findTask) res.send(findTask);
  });

  fastify.post<{Body:{title: string, columnId: string, userId: string, description: string, order: string},Params: {boardId: string}}>(
    '/boards/:boardId/tasks',
    postTaskOpts,
    async (req, res) => {
    const {boardId} = req.params;
    const {title, columnId, userId, description, order} = req.body;
    const task: ITask = {
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
  });

  fastify.put<{Params: {taskId: string}, Body: {title: string, columns: []}}>('/boards/:boardId/tasks/:taskId', updateTaskOpts, async (req, res) => {
    const {taskId} = req.params;
    const {title, columns} = req.body;

    const findTasks = TASKS.find((task) => task.id === taskId);
    if(!findTasks) return res.status(404).send({message: `Tasks ${taskId} not found`});

    if (title)
      findTasks.title = title;
    if (columns)
      findTasks.columns = columns;

    return res.send(findTasks)
  });

  fastify.delete<{Params: {taskId: string}}>(
    '/boards/:boardId/tasks/:taskId',
    deleteTaskOpts,
    async (req, res) => {
    const {taskId} = req.params;

    const findTasks = TASKS.find((task) => task.id === taskId);
    if(!findTasks) return res.status(404).send({message: `Tasks ${taskId} not found`});

    TASKS = TASKS.filter(task => task.id !== taskId);

    return res.send({message: `Tasks ${taskId} has been removed`})
  });

  done()
}

export const removeSuccessTasks = async (userId: string) => {
  TASKS = TASKS.map(task => task.userId === userId ? {...task, userId: null} : task);
};

export const removeSuccessTasksBoardId = async (boardId: string) => {
  TASKS = TASKS.map((task) =>
    task.boardId === boardId ? { ...task, userId: null, boardId: null } : task
  );
};


export default TaskRoutes;
