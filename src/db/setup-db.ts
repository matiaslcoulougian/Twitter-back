import Knex from 'knex';
import { Model, knexSnakeCaseMappers } from 'objection';

import knexfile from './knexfile';

export const setupDb = () => {
  const knex = Knex({
    ...knexfile,
    ...knexSnakeCaseMappers(),
  });
  Model.knex(knex);
  return knex;
};
