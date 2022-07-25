const { logger: l } = require("@utils/logger.util");

async function getMapsByUserId(req, res) {
  try {
    const userId = req.query.user_id;
    const { validateQueryString, fetchMapsByUserId } =
      require("@services/maps.service");

    const validQS = validateQueryString(userId);

    if (validQS) {
      const rows = await fetchMapsByUserId(userId);

      res.send(rows);
    } else {
      throw new Error("query string is not a valid UUID", {
        cause: "InvalidUUID"
      });
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
}

module.exports = {
  getMapsByUserId
}

