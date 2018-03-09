module.exports = {
  server: {
    port: process.env.PORT || 4000,
  },

  jwt: {
    expires: '30m',
    secret: 'Like a monkey, ready to be shot into space.',
  },

  hash: {
    rounds: 8,
  },

  database: {
    driver: 'mysql',

    sqlite: {
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: {
        filename: './database/tests.sqlite3',
      },
      migrations: {
        directory: 'database/migrations',
      },
      seeds: {
        directory: process.env.node_ENV !== 'production' ? 'database/seeds' : null,
      },
    },

    mysql: {
      migrations: {
        directory: 'database/migrations',
      },
      seeds: {
        directory: process.env.node_ENV !== 'production' ? 'database/seeds' : null,
      },
    },
  },
};
