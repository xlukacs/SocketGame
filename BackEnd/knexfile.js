module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: process.env.database_host || 'localhost',
        user: process.env.database_username || 'postgres',
        password: process.env.database_password || 'toor',
        database: process.env.database_database || 'socketgame',
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