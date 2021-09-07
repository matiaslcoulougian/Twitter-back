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
       table.uuid('user_id');
       table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
       table.uuid('parent_tweet_id');
       table.foreign('parent_tweet_id').references('id').inTable('tweets').onDelete('CASCADE')
       table.boolean('is_active').defaultTo(true);
       table.timestamps(true, true);
    })
        .createTable('likes', (table)=>{
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.uuid('user_id');
            table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
            table.uuid('tweet_id');
            table.foreign('tweet_id').references('id').inTable('tweets').onDelete('CASCADE')
            table.boolean('is_active').defaultTo(true);
            table.timestamps(true, true);
        })
        .createTable('follows', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.uuid('follower_user_id');
            table.foreign('follower_user_id').references('id').inTable('users').onDelete('CASCADE')
            table.uuid('followed_user_id');
            table.foreign('followed_user_id').references('id').inTable('users').onDelete('CASCADE')
            table.boolean('is_active').defaultTo(true);
            table.timestamps(true, true);
        })
};

export const down = (knex: Knex): Promise<void> => {
    return knex.schema.dropTable('users');
    return knex.schema.dropTable('tweets');
    return knex.schema.dropTable('likes');
    return knex.schema.dropTable('follows');
};