const { Pool } = require("pg");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  /* Opcional para conexiones locales */
/* port: DB_PORT, */
});

module.exports = pool;
