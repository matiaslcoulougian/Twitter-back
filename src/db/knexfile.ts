import Knex from 'knex';

import { isTestEnv } from '../config';

const testUrl ={
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'twitter_test_db'
}
const url ={
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'twitter_db'
}

const connectionConfig = isTestEnv ? testUrl : url;

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: connectionConfig,
  migrations: {
    tableName: 'migrations',
    directory: 'src/db/migrations',
  },
  debug: false,
};

// eslint-disable-next-line import/no-default-export
export default knexConfig;
