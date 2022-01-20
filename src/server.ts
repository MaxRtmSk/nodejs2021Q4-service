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
}).catch(e=>console.log('eeeeeee', e));

