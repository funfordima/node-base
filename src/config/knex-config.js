module.exports = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: process.env.DB_PORT,
    user: 'postgres',
    password: 'root',
    database: 'pg_demo',
  },
});
