const { logger: l } = require("@utils/logger.util");
const db = require("@boot/db.boot");

async function insertNode(values) {
  l.info("values @ insertNode", values);

  // TODO: determine validation criteria and validate values with express-validator
  if (!values.parent_id) { // record to be inserted is a main node
    var qs = "INSERT INTO nodes (content, map_id) VALUES ($1, $2) RETURNING *";
    var qp = [values.content, values.map_id];
  } else {
    var qs = "INSERT INTO nodes (parent_id, content, map_id) VALUES ($1, $2, $3) RETURNING *";
    var qp = [values.parent_id, values.content, values.map_id];
  }

  try {
    l.info("qp @ insertNode", qp);
    const res = await db.query(qs, qp);
    l.info("res @ insertNode: %s\n", qs, res);

    if (!res || !res.rowCount) {
      throw new Error("failed to insert node record", {
        cause: "Query failure"
      });
    }

    return res.rows[0];
  } catch (err) {
    if (err.cause === "Query failure") {
      l.error(err.message, err.cause);
      res.status(500).send(err.message);
    } else {
      l.error(err);
      throw new Error("unhandled exception");
    }
  }
}

// async function deleteNodesByMapId(condition) {
//   try {
//     // TODO: determine validation criteria and validate value with express-validator
//     const qs = "DELETE FROM nodes WHERE map_id = $1";
//     const qp = [condition];

//     l.info("qp @ deleteNodesByMapId", qp);
//     const res = await db.query(qs, qp);
//     l.info("res = DELETE FROM nodes WHERE map_id = $1\n", res);

//     if (!res || !res.rowCount) {
//       return new Error("failed to delete node record(s)", {
//         cause: "Query failure"
//       });
//     }

//     return true;
//   } catch (err) {
//     l.error(err);
//     throw new Error("unhandled exception"); // TODO: determine possible errors and handle them specifically
//   }
// }

module.exports = {
  insertNode,
  // deleteNodesByMapId
  // selectNodesByUserId,
  // selectNodeById,
  // updateNodeById,
  // deleteNodeById // TODO: define it
}

