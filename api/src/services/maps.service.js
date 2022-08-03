const { logger: l } = require("@utils/logger.util");
const db = require("@boot/db.boot");

async function insertMap(values) {
  try {
    // TODO: determine validation criteria and validate values with express-validator
    const qs = "INSERT INTO maps (title, user_id) VALUES ($1, $2)";
    const qp = values;

    l.info("qp @ insertMap", qp);
    const rows = await db.query(qs, qp);
    l.info("rows = INSERT INTO maps (title, user_id) VALUES ($1, $2) @ insertMap\n", rows);

    if (!rows.rowCount) {
      throw new Error("failed to insert map record", {
        cause: "Query failure"
      });
    }
  } catch (err) {
    if (err.cause === "Query failure") {
      l.error(err.message, err.cause);
      res.status(500).send(err.message);
    } else {
      l.error(err);
      throw new Error("unhandled exception");
      res.status(500).send(err.message);
    }
  }
}

async function selectMaps(condition) {
  try {
    const qs = "SELECT * FROM maps where user_id = $1";
    const qp = [condition];


    l.info("qp @ getMaps", qp);
    const { rows } = await db.query(qs, qp);
    l.debug("rows = SELECT * FROM maps where user_id = $1\n", rows);

    if (!rows) {
      throw new Error("failed to retrieve map records", {
        cause: "Query failure"
      });
    }

    return rows;
  } catch (err) {
    if (err.cause === "Query failure") {
      l.error(err.message, err.cause);
      res.status(500).send(err.message);
    } else {
      l.error(err);
      throw new Error("unhandled exception");
      res.status(500).send(err.message);
    }
  }
}

function validateQueryString(qs) {
  // TODO: add validation: only one key-value pair in query string?
  /* valid UUID? */
  const validate = require("uuid-validate");
  const isValid = validate(qs);

  return isValid;
}

async function fetchMapsByUserId(userId) {
  const qs = "SELECT * FROM maps WHERE user_id = $1";
  const qp = [userId];

  const { rows } = await db.query(qs, qp);
  l.debug({ rows: rows });

  return rows;
}

module.exports = {
  validateQueryString,
  fetchMapsByUserId,
  insertMap,
  selectMaps
}

