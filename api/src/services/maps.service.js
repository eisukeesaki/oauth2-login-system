const { logger: l } = require("@utils/logger.util");
const db = require("@boot/db.boot");

async function insertMap(values) {
  l.info("values @ insertMap", values);
  try {
    const qs = "INSERT INTO maps (title, user_id) VALUES ($1, $2) RETURNING *";
    const qp = values;

    l.info("qp @ insertMap", qp);
    const dbr = await db.query(qs, qp);
    l.info("dbr @ insertMap: INSERT INTO maps (title, user_id) VALUES ($1, $2) RETURNING * @ insertMap\n", dbr);

    if (!dbr) {
      const err = new Error("failed to create map record", {
        cause: "Query failure"
      });
      l.error(err);
      return err;
    }

    if (dbr.rowCount === 1)
      return dbr.rows[0];
    else
      return false;

    throw new Error();
  } catch (err) {
    l.error(err);
    throw new Error("[FATAL] unhandled exception");
  }
}

async function selectMapsByUserId(condition) {
  try {
    const qs = "SELECT * FROM maps where user_id = $1";
    const qp = [condition];

    l.info("qp @ selectMapsById", qp);
    const dbr = await db.query(qs, qp);
    l.info("dbr @ selectMapsById: SELECT * FROM maps where user_id = $1\n", dbr);

    if (!dbr) {
      const err = new Error("failed to get map record(s)", {
        cause: "Query failure"
      });
      l.error(err);
      return err;
    }

    if (0 < dbr.rowCount)
      return dbr.rows;
    else
      false;
  } catch (err) {
    l.error(err);
    throw new Error("[FATAL] unhandled exception");
  }
}

async function selectMapById(condition) {
  try {
    const qs = "SELECT * FROM maps where id = $1";
    const qp = [condition];

    l.info("qp @ selectMapById", qp);
    const dbr = await db.query(qs, qp);
    l.info("dbr @ selectMapById: SELECT * FROM maps where id = $1\n", dbr);

    if (!dbr) {
      const err = new Error("failed to update map record", {
        cause: "Query failure"
      });
      l.error(err);
      return err;
    }

    if (dbr.rowCount === 1)
      return dbr.rows[0];
    else
      return false;

    throw new Error(); // TODO: too paranoid?
  } catch (err) {
    l.error(err);
    throw new Error("[FATAL] unhandled exception");
  }
}

async function updateMapById(condition, value) {
  l.info("executing updateMapById");
  try {
    const qs = "UPDATE maps SET title = $1 WHERE id = $2 RETURNING *";
    const qp = [value, condition];

    l.info("qp @ updateMapById", qp);
    const dbr = await db.query(qs, qp);
    l.info("dbr = UPDATE maps SET title = $1 WHERE id = $2 RETURNING *@ updateMapById\n", dbr);

    if (!dbr) {
      const err = new Error("failed to update map record", {
        cause: "Query failure"
      });
      l.error(err);
      return err;
    }

    if (dbr.rowCount === 1)
      return dbr.rows[0];
    else
      return false;

    throw new Error(); // TODO: too paranoid?
  } catch (err) {
    l.error(err);
    throw new Error("[FATAL] unhandled exception");
  }
}

async function deleteMapById(condition) {
  try {
    const qs = "DELETE FROM maps WHERE id = $1";
    const qp = [condition];

    l.info("qp @ deleteMapById", qp);
    const dbr = await db.query(qs, qp);
    l.info("dbr @ deleteMapById = DELETE FROM maps WHERE id = $1\n", dbr);

    if (!dbr) {
      const err = new Error("failed to delete map record", {
        cause: "Query failure"
      });
      l.error(err);
      return err;
    }

    if (dbr.rowCount === 1)
      return true;
    else
      return false;

    throw new Error(); // TODO: too paranoid?
  } catch (err) {
    l.error(err);
    throw new Error("[FATAL] unhandled exception");
  }
}

module.exports = {
  insertMap,
  selectMapsByUserId,
  selectMapById,
  updateMapById,
  deleteMapById
}

// async function insertMap(values) {
//   try {
//     // TODO: determine validation criteria and validate values with express-validator
//     const qs = "INSERT INTO maps (title, user_id) VALUES ($1, $2)";
//     const qp = values;

//     l.info("qp @ insertMap", qp);
//     const res = await db.query(qs, qp);
//     l.info("res = INSERT INTO maps (title, user_id) VALUES ($1, $2) @ insertMap\n", res);

//     if (!res.rowCount) {
//       throw new Error("failed to insert map record", {
//         cause: "Query failure"
//       });

//     // TODO: return udpated redcord
//     }
//   } catch (err) {
//     if (err.cause === "Query failure") {
//       l.error(err.message, err.cause);
//       res.status(500).send(err.message);
//     } else {
//       l.error(err);
//       throw new Error("unhandled exception");
//       res.status(500).send(err.message);
//     }
//   }
// }

/*

async function fetchMapsByUserId(userId) {
  const qs = "SELECT * FROM maps WHERE user_id = $1";
  const qp = [userId];

  const { rows } = await db.query(qs, qp);
  l.debug({ rows: rows });

  return rows;
}

*/

