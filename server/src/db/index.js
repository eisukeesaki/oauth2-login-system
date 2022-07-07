const { logger: l } = require("../utils/logging/logger");
require("dotenv").config();
const { Pool } = require("pg");
const testQuery = require("../utils/db/query-timestamp");

const config = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
}

const pool = new Pool(config);

testQuery(pool);

module.exports = {
  query: (string, params) => pool.query(string, params)
}

