exports.up = knex => (
  knex.schema.createTable('board_user', (table) => {
  	table.increments('id').primary();
  	table.integer('board_id').unsigned();
  	table.integer('user_id').unsigned();
  	table.foreign('board_id').references('boards.id');
  	table.foreign('user_id').references('users.id');
  	table.boolean('admin').defaultTo(false);
  })
);

exports.down = knex => (
  knex.schema.dropTableIfExists('board_user')
);
