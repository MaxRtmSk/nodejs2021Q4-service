import path from 'path';
import { ConnectionOptions } from 'typeorm';
import config from './config';

const isCompiled = path.extname(__filename).includes('js');


export default {
  type: 'postgres',
//   url: 'postgres://postgres:postgres@backend:5432/postgres',
  port: +config.POSTGRES_PORT,
  host: config.POSTGRES_HOST || 'localhost',
  username: config.POSTGRES_USER || 'postgres',
  password: config.POSTGRES_PASSWORD || 'postgres',
  database: config.POSTGRES_DB || 'postgres',
  synchronize: false,
  migrationsRun: true,
  dropSchema: true,
  logging: true,
  entities: [path.join(__dirname, `../resources/**/*.entity.${isCompiled ? 'js' : 'ts'}`)],
  migrations: [path.join(__dirname, `../migration/*.${isCompiled ? 'js' : 'ts'}`)],
  cli: {
    entitiesDir: path.join(__dirname, `/resources`),
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
} as ConnectionOptions;