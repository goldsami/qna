require('dotenv').config();

module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_ROOT_USER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      }
    },
  }