module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: process.env.database_host,
        user: process.env.database_username,
        password: process.env.database_password,
        database: process.env.database_database,
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './db/migrations',
      },
      seeds: {
        directory: './db/seeds',
      },
    },
  };