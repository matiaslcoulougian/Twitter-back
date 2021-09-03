/* eslint-disable no-console */
import path from 'path';
import { exit } from 'process';

import knex from 'knex';

import knexfile from '../src/db/knexfile';


const testUrl ={
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'twitter_db'
}
const url ={
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'twitter_db'
}

const resetDb = async (dbUrl: any, seed = true) => {
  const { database, host, user, password } = dbUrl;
  const knexConfig = {
    client: knexfile.client,
    connection: {
      host: host || undefined,
      user,
      password,
      database,
    },
    debug: false,
  };
  let knexInstance = knex(knexConfig);
  console.log(`Clearing tables in DB ${database}...`);
  await knexInstance.raw(`
    DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END $$;`);
  knexInstance = knex({
    ...knexConfig,
    connection: dbUrl,
    migrations: {
      tableName: 'migrations',
      directory: path.join(__dirname, '../src/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '../src/db/seeds'),
    },
  });
  console.log(`Migrating ${database}...`);
  await knexInstance.migrate.latest();
  if (seed) {
    console.log(`Seeding ${database}...`);
    await knexInstance.seed.run();
  }
};

(async () => {
  try {
    await resetDb(testUrl, false);
    console.log('Test database reset success 🎉');
  } catch (err) {
    console.log('Failed to reset database', err.message);
  }

  try {
    await resetDb(url);
    console.log('Database reset success 🎉');
  } catch (err) {
    console.log('Failed to reset database', err.message);
  } finally {
    exit();
  }
})();
