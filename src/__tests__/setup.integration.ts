import dotenv from 'dotenv';
import Knex from 'knex';
import knexCleaner from 'knex-cleaner';

import { setupDb } from '@/db';

let knex: Knex;
beforeAll(() => {
  dotenv.config();
  knex = setupDb();
});

afterAll(() => {
  return knex.destroy();
});

beforeEach(() => {
  return knexCleaner.clean(knex);
});
