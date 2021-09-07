import argon2 from 'argon2';
import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
    const users = await knex('users').insert(
        [
            {
                user_name: "aaaaaaBBB",
                password: '123456Aaaaa*',
                name: 'Carlos',
                mail: 'aasdf@gmail.com',
                phone: '1118868329',
                birth_date: '06/09/1978',
            },
            {
                user_name: "CCC",
                password: '123456Aaaaa*',
                name: 'Carlos Rodriguez',
                mail: 'aasdf@gmail.com',
                phone: '1118868329',
                birth_date: '06/09/1978',
            },
            {
                user_name: "dddd",
                password: '1234*',
                name: 'Juan',
                mail: 'aasdf@gmail.com',
                phone: '1118868329',
                birth_date: '06/09/1978',
            },
            {
                user_name: "abc",
                password: '123456Aaaaa*',
                name: 'Carlos abc',
                mail: 'aqqqwe@gmail.com',
                phone: '1118868329',
                birth_date: '06/09/1978',
            },
            {
                user_name: "mellamojuan",
                password: '123456Aaaaa*',
                name: 'Juan',
                mail: 'juan@gmail.com',
                phone: '1111122431',
                birth_date: '06/09/1978',
            },
            {
                user_name: "adasdadds",
                password: '123456Aaaaa*',
                name: 'Carla',
                mail: 'asdd@gmail.com',
                phone: '11188680329',
                birth_date: '06/09/1978',
            },
            {
                user_name: "LionelMessi",
                password: '123456Aaaaa*',
                name: 'Messi',
                mail: 'messi@gmail.com',
                phone: '1118868329',
                birth_date: '06/09/1978',
            },
            {
                user_name: "aaaaaaa",
                password: '123456Aaaaa*',
                name: 'Alejo',
                mail: 'alejito@gmail.com',
                phone: '1118868329',
                birth_date: '06/09/1978',
            },
        ],
        ['id'],
    );
    const tweets = await knex('tweets').insert([
        {
            user_id: users[0].id,
            text: 'I like programming',
        },
        {
            user_id: users[1].id,
            text: 'me llamo carlos hola',
        },
        {
            user_id: users[3].id,
            text: 'aaaaaaaa',
        },
        {
            user_id: users[5].id,
            text: 'bbbbbbbbbb',
        },
        {
            user_id: users[1].id,
            text: 'vamos bokita',
        },
        {
            user_id: users[2].id,
            text: 'me gusta el helado',
        },
        ],['id']
    );
    await knex('tweets').insert([
        {
            user_id: users[1].id,
            text: 'in typescript',
            parent_tweet_id: tweets[0].id
        },
        {
        user_id: users[5].id,
        text: 'hola carlos todo bn',
        parent_tweet_id: tweets[1].id
        },
    ])
    const follows = await knex('follows').insert([
        {
            follower_user_id: users[1].id,
            followed_user_id: users[2].id,
        },
        {
            follower_user_id : users[2].id,
            followed_user_id : users[1].id,
        },
        {
            follower_user_id: users[2].id,
            followed_user_id: users[4].id,
        },
        {
            follower_user_id: users[3].id,
            followed_user_id: users[5].id,
        },
        {
            follower_user_id: users[1].id,
            followed_user_id: users[5].id,
        },
        {
            follower_user_id: users[7].id,
            followed_user_id: users[6].id,
        },
        {
            follower_user_id: users[5].id,
            followed_user_id: users[7].id,
        },
        {
            follower_user_id: users[6].id,
            followed_user_id: users[5].id,
        },
        {
            follower_user_id: users[3].id,
            followed_user_id: users[2].id,
        },
        {
            follower_user_id: users[4].id,
            followed_user_id: users[1].id,
        },
        ])
}