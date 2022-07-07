const { logger: l } = require("../logging/logger");

async function queryTimestamp(pool) {
  try {
    l.info("querying database...")
    const res = await pool.query("SELECT NOW()");

    if (res.rows.length)
      l.info("database query successful");
    else
      l.info("empty response from from database");
  } catch (error) {
    l.info("Failed to query database.\n%s", error.stack);
  }
}

module.exports = queryTimestamp

