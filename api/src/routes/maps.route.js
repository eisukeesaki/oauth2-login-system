const { logger: l } = require("@utils/logger.util");
const maps = require("express").Router();
const db = require("@services/db.service");

maps.get("/api/maps", async (req, res) => {
  try {
    const userId = req.query.user_id;
    const validate = require("uuid-validate");
    const isValidQs = validate(userId);

    if (isValidQs) {
      const qs = "SELECT * FROM maps WHERE user_id = $1";
      const qp = [userId];

      const { rows } = await db.query(qs, qp);
      l.debug({ rows: rows });

      res.send(rows);
    } else {
      throw new Error("query string is not a valid UUID", { cause: "InvalidUUID" });
    }
  } catch (e) {
    if (e.cause === "InvalidUUID") {
      l.error({ message: e.message, cause: e.cause });
      res.status(400).send(e.message);
    } else {
      l.error(e);
      throw new Error("unhandled exception");
    }
  }
});

module.exports = maps;

