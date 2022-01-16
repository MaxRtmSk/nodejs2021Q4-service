import path from 'path';
import { ConnectionOptions } from 'typeorm';
import config from './config';

const isCompiled = path.extname(__filename).includes('js');


export default {
  type: 'postgres',
//   url: 'postgres://postgres:postgres@backend:5432/postgres',
  port: ~~config.POSTGRES_PORT,
  host: '0.0.0.0' || 'localhost',
  username: config.POSTGRES_USER || 'postgres',
  password: config.POSTGRES_PASSWORD || 'postgres',
  database: config.POSTGRES_DB || 'postgres',
  synchronize: false,
  migrationsRun: true,
  dropSchema: true,
  logging: true,
  entities: [path.join(__dirname, `/**/*.entity.${isCompiled ? 'js' : 'ts'}`)],
  migrations: [path.join(__dirname, `./src/migration/*.${isCompiled ? 'js' : 'ts'}`)],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
} as ConnectionOptions;