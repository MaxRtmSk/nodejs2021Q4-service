import AuthController from './auth.controller';


const loginOpts = { 
  schema: {
    body: {
        type: 'object',
        require: ["login", "password"],
        properties: {
          login: {type: "string"},
          password: {type: "string"}
        }
    }
  },

  handler: AuthController.login
};



function AuthRoute (fastify, _, done) {

  fastify.post('/login', loginOpts);

  done()
};


export default AuthRoute;
