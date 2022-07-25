const { logger: l } = require("@utils/logger.util");

function validateQueryString(qs) {
  // TODO: add validation: only one key-value pair in query string?
  /* valid UUID? */
  const validate = require("uuid-validate");
  const isValid = validate(qs);

  return isValid;
}

async function fetchMapsByUserId(userId) {
  const db = require("@services/db.service");
  const qs = "SELECT * FROM maps WHERE user_id = $1";
  const qp = [userId];

  const { rows } = await db.query(qs, qp);
  l.debug({ rows: rows });

  return rows;
}

module.exports = {
  validateQueryString,
  fetchMapsByUserId
}

