exports.up = knex => (
  knex.schema.createTable('boards', (table) => {
    table.increments('id').primary();
    table.title('title').notNullable();
  })
);

exports.down = knex => (
	knex.schema.dropTableIfExists('boards')
);
