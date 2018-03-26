exports.up = knex => (
  knex.schema.createTable('board_user', (table) => {
  	table.increments('id').primary();
  	table.foreign('board_id').reference('boards.id');
  	table.foreign('user_id').reference('users.id');
  	table.boolean('admin').defaultTo(false);
  })
);

exports.down = knex => (
  knex.schema.dropTableIfExists('board_user')
);
