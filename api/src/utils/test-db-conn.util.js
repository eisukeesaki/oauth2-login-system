module.exports = async function testDbConn(pool) {
  try {
    const { logger: l } = require("@utils/logger.util");
    l.info("querying database...");

    const res = await pool.query("SELECT NOW()");
    // const { rows } = await pool.query("SELECT * FROM federated_credentials WHERE provider = 'https://accounts.google.com' AND subject = '101817407341620423232'");
    // l.info("rows - ", rows);

    if (res.rowCount)
      l.info("database query successful");
    else
      throw new Error("failed to do a test query at server start up");
  } catch (error) {
    l.info("failed to do a test query on database on server start up.\n%s", error.stack);
  }
}
