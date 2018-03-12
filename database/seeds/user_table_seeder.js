const bcrypt = require('bcrypt');
const config = require('config');

exports.seed = knex => (
  knex('users').del()
    .then(() => (
      knex('users').insert([
        {
          password: bcrypt.hashSync('foo@123', config.get('hash.rounds')),
          name: 'Lucas Leandro',
          email: 'lucas@leandro.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
    ))
);
