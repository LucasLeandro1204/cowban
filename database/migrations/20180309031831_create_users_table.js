exports.up = knex => (
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').unique();
    table.string('password').notNullable();
    table.dateTime('created_at');
    table.dateTime('updated_at');
  })
);

exports.down = knex => (
  knex.schema.dropTableIfExists('users')
);
