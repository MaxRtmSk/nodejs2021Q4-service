import 'reflect-metadata';
import { createConnection } from 'typeorm';

import server from './app';
import config from './common/config';

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: 'postgres'
})

const start = async () => {
  try {
    await server.listen(config.PORT, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();