import { FastifyError, FastifyInstance, FastifyReply, RegisterOptions } from 'fastify';
import { IUser } from './user.memory.repository';
import usersService from './user.service';

const UserSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    name: {type: "string"},
    login: {type: "string"}
  }
} as const

const getUsersOpts = {
  schema: {
    response:{
      200: {
        type: 'array',
        items: UserSchema
      }
    }
  }
};

const getUserOpts = {
  schema: {
    response: {
      200: UserSchema
    }
  }
}

const postUserOpts = {
  schema: {
    body: {
        type: 'object',
        require: ["password", "login", "name"],
        properties: {
          name: {type: 'string'},
          password: {type: 'string'},
          login: {type: 'string'},
        }
    },
    response: {
      201: UserSchema
    }
  },
}

const updateUserOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: {type: 'string'},
        password: {type: 'string'},
        login: {type: 'string'},
      }
    },
    response: {
      200: UserSchema
    }
  },
}

const deleteUserOpts = {
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
}

function UserRoutes (fastify: FastifyInstance, options: RegisterOptions, done: (err?: FastifyError) => void) {

  fastify.get<{ Body: IUser}>(
    '/users',
    getUsersOpts,
    async (req, res): Promise<void> => {
      const users  = usersService.getAll();
      res.send(users);
    });

  fastify.get<{ Body: IUser, Params: {id: string}}>(
    '/users/:id',
    getUserOpts,
    async (req, res): Promise<void> => {
    const { id } = req.params;
    const user = usersService.getById(id);
    if(!user) res.status(404)
    res.send(user);
  });

  fastify.post<{ Body: IUser}>(
    '/users',
    postUserOpts,
    async (req, res): Promise<FastifyReply> => {
    const { name, login, password } = req.body;
    if(!name || !login || !password) return res.code(500).send('Not body')
    const result = usersService.create({name, login, password});
    return res.code(201).send(result);
  });

  fastify.put<{ Body: IUser, Params: {id: string}}>(
    '/users/:id',
    updateUserOpts,
    async (req, res): Promise<void> => {
    const { id } = req.params;
    const { name, login, password } = req.body;

    const findUser = usersService.getById(id);
    if(!findUser) return res.status(404).send({message: `User ${id} not found`});

    const result = usersService.update({name, login, password}, id)
    return res.send(result)
  });

  fastify.delete<{ Body: IUser, Params: {id: string}}>(
    '/users/:id',
    deleteUserOpts,
    async (req, res) => {
    const { id } = req.params;

    const findUser = usersService.getById(id);
    if(!findUser) return res.status(404).send({message: `User ${id} not found`});

    usersService.remove(id);

    return res.send({message: `User ${id} has been removed`})
  });

  done()
}


export default UserRoutes