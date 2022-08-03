const { logger: l } = require("@utils/logger.util");
const { insertMap, selectMaps, validateQueryString, fetchMapsByUserId } =
  require("@services/maps.service");

async function createMap(req, res, next) {
  try {
    l.info("req.body @ createMap", req.body);
    const title = req.body.title;

    const rows = await insertMap([title, req.session.userId]);

    res.status(201).end();
  } catch (err) {
    l.error(err);
    // TODO: determine possible errors and handle them specifically
    throw new Error("unhandled exception");
    res.status(500).send(err.message);
  }
}

async function getMaps(req, res) {
  try {
    const userId = req.session.userId;

    const rows = await selectMaps(userId);

    res.send(rows);
  } catch (err) {
    l.error(err);
    // TODO: determine possible errors and handle them specifically
    throw new Error("unhandled exception");
    res.status(500).send(err.message);
  }
}

module.exports = {
  createMap,
  getMaps
};

// async function getMaps(req, res) {
//   try {
//     const userId = req.query.user_id;

//     const validQS = validateQueryString(userId);

//     if (validQS) {
//       const rows = await fetchMapsByUserId(userId);

//       res.send(rows);
//     } else {
//       throw new Error("query string is not a valid UUID", {
//         cause: "InvalidUUID"
//       });
//     }
//   } catch (err) {
//     if (e.cause === "InvalidUUID") {
//       l.error({ message: e.message, cause: e.cause });
//       res.status(400).send(e.message);
//     } else {
//       l.error(err);
//       throw new Error("unhandled exception");
//     }
//   }
// }

