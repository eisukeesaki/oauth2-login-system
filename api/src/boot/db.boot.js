const { logger: l } = require("@utils/logger.util");
require("dotenv").config();
const { Pool } = require("pg");

const config = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
}

const pool = new Pool(config);

module.exports = {
  query: (string, params) => pool.query(string, params)
}

