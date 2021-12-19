import { randomUUID } from 'crypto';
import { FastifyError, FastifyInstance, RegisterOptions } from 'fastify';
import { removeSuccessTasksBoardId } from '../tasks/tasks.router';

interface IBoard {
  id: string,
  title: string,
  columns: []
}

let BOARDS: IBoard[] = [];

const Column = {
  type: "object",
    properties: {
    order: {type: "number"},
    title: {type: "string"}
  }
}
const Board = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    title: {type: "string"},
    columns: {
      type: "array",
      items: Column
    }
  }
}

const getBoardsOpts = {
  schema: {
    response:{
      200: {
        type: 'array',
        items: Board
      }
    }
  }
}

const getBoardOpts = {
  schema: {
    response: {
      200: Board
    }
  }
}

const postBoardOpts = {
  schema: {
    body: {
        type: 'object',
        require: ["title", "columns"],
        properties: {
          title: {type: "string"},
          columns: {type: "array"}
        }
    },
    response: {
      201: Board 
    }
  }
}

const updateBoardOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: {type: 'string'},
        pasword: {type: 'string'},
        login: {type: 'string'},
      }
    },
    response: {
      200: Board 
    }
  }
}

const deleteBoardOpts = {
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

function BoardRoutes (fastify: FastifyInstance, options: RegisterOptions, done: (err?: FastifyError) => void) {

  fastify.get<{ Body: IBoard}>(
    '/boards',
    getBoardsOpts,
    async (req, res) => {
    res.send(BOARDS);
  });

  fastify.get<{Params:{boardId: string}}>(
    '/boards/:boardId',
    getBoardOpts,
    async (req, res) => {
      const {boardId} = req.params;
      const findBoard = BOARDS.find((board) => board.id === boardId);
      if(!findBoard) res.status(404).send({message: `Board ${boardId} not found`});
      if(findBoard) res.send(findBoard);
    }
  );

  fastify.post<{Body:{title:string, columns: []}}>(
    '/boards',
    postBoardOpts,
    async (req, res) => {
      const {title, columns} = req.body;
      const board = {
        id: randomUUID(),
        title,
        columns,
      };

      BOARDS = [...BOARDS, board]

      res.code(201).send(board);
    });

  fastify.put<{Body:{title: string, columns: []}, Params:{boardId: string}}>(
    '/boards/:boardId',
    updateBoardOpts,
    async (req, res) => {
    const {boardId} = req.params;
    const {title, columns} = req.body;

    const findBoard = BOARDS.find((board) => board.id === boardId);
    if(!findBoard) return res.status(404).send({message: `Board ${boardId} not found`});

    if (title)
      findBoard.title = title;
    if (columns)
      findBoard.columns = columns;

    return res.send(findBoard)
  });

  fastify.delete<{ Body: IBoard, Params: {boardId: string}}>(
    '/boards/:boardId',
    deleteBoardOpts,
    async (req, res) => {
    const {boardId} = req.params;

    const findBoard = BOARDS.find((board) => board.id === boardId);
    if(findBoard){
      await removeSuccessTasksBoardId(boardId)
      BOARDS = BOARDS.filter(board => board.id !== boardId);
      res.send({message: `Board ${boardId} has been removed`})
    }
    if (!findBoard) res.status(404).send({message: `Board ${boardId} not found`});
  });

  done()
}


export default BoardRoutes;
