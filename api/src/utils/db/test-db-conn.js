const { logger: l } = require("../logging/logger");

async function testDbConn(pool) {
  try {
    l.info("querying database...")
    const res = await pool.query("SELECT NOW()");

    if (res.rows.length)
      l.info("database query successful");
    else
      throw new Error("failed to do a test query at server start up");
  } catch (error) {
    l.info("failed to do a test query on database on server start up.\n%s", error.stack);
  }
}

module.exports = testDbConn;

