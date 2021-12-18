const { getBoards, getBoard, addBoard, deleteBoard, updateBoard } = require("./board.controller");

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
  },

  handler: getBoards
}

const getBoardOpts = {
  schema: {
    response: {
      200: Board
    }
  },

  handler: getBoard
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
  },

  handler: addBoard
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
  },

  handler: updateBoard
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
  },

  handler: deleteBoard
}

function BoardRoutes (fastify, options, done) {

  fastify.get('/boards', getBoardsOpts);
  fastify.get('/boards/:boardId', getBoardOpts);
  fastify.post('/boards', postBoardOpts);
  fastify.put('/boards/:boardId', updateBoardOpts);
  fastify.delete('/boards/:boardId', deleteBoardOpts);

  done()
}


module.exports = BoardRoutes;
