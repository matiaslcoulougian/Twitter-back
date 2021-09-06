import Knex from 'knex';

export const up = (knex: Knex): Promise<void> => {
    return knex.schema
        .createTable('users', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.string('user_name');
            table.string('password');
            table.string('name');
            table.string('mail');
            table.string('phone');
            table.string('birth_date');
            table.string('bibliography');
            table.string('location');
            table.string('website');
            table.boolean('is_active').defaultTo(true);
            table.timestamps(true, true);
        })
    .createTable('tweets', (table)=>{
       table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
       table.string('text');
       table.string('user_id');
       table.string('parent_tweet_id');
       table.boolean('is_active').defaultTo(true);
       table.timestamps(true, true);
    })
};

export const down = (knex: Knex): Promise<void> => {
    return knex.schema.dropTable('users');
    return knex.schema.dropTable('tweets');
};