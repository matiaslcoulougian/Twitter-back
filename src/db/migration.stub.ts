import Knex from 'knex';

export const up = (knex: Knex): Promise<void> => {
  return knex.schema;
};

export const down = (knex: Knex): Promise<void> => {
  return knex.schema;
};
