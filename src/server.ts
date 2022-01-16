import path from 'path';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import server from './app'
import config from './common/config';
import ormconfig from './common/ormconfig';

process.on('uncaughtException', function (err) {
  console.log(err);
}); 


const startHttpServer = async () => {
  try {
    await server.listen(config.PORT, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

createConnection(ormconfig).then(async connection => {
  await startHttpServer();

  // console.log("Inserting a new user into the database...");
  // const user = new User();
  // user.firstName = "Timber";
  // user.lastName = "Saw";
  // user.age = 25;
  // await connection.manager.save(user);
  // console.log("Saved a new user with id: " + user.id);

  // console.log("Loading users from the database...");
  // const users = await connection.manager.find(User);
  // console.log("Loaded users: ", users);

  // console.log("Here you can setup and run express/koa/any other framework.");
}).catch(e=>console.log('eeeeeee', e));

