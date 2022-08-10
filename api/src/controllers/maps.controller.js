const { logger: l } = require("@utils/logger.util");
const { insertMap, selectMapsByUserId, selectMapById, updateMapById, deleteMapById } =
  require("@services/maps.service");

async function createMap(req, res, next) {
  try {
    const title = req.body.title;
    const userId = req.session.userId;

    const created = await insertMap([title, userId]);
    l.info("created @ createMap", created);

    if (created instanceof Error && created.cause == "Query failure")
      return res.send(500);

    res.status(201).send(created);
  } catch (err) {
    l.error(err);
    throw new Error("[FATAL] unhandled exception");
  }
}

async function getMaps(req, res) {
  try {
    const userId = req.session.userId;

    const got = await selectMapsByUserId(userId);

    if (got instanceof Error && got.cause === "Query failure")
      return res.send(500);

    res.send(got);
  } catch (err) {
    l.error(err);
    throw new Error("[FATAL] unhandled exception");
  }
}

async function updateMap(req, res, next) {
  try {
    const mapId = req.body.id;
    const title = req.body.title;
    const userId = req.session.userId;
    l.info("mapId @ updateMap", mapId);
    l.info("title @ updateMap", title);

    const toUpdate = await selectMapById(mapId);
    l.info("toUpdate @ updateMap", toUpdate);

    if (toUpdate instanceof Error && toUpdate.cause === "Query failure")
      return res.send(500);
    if (toUpdate.user_id != userId)
      return res.status(401).end();
    if (toUpdate.title == title)
      return res.status(200).send(toUpdate); // TODO: more appropriate response?

    const updated = await updateMapById(mapId, title);
    l.info("updated @ updateMap", updated);

    if (updated instanceof Error && updated.cause === "Query failure")
      return res.send(500);

    res.status(201).send(updated);
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

async function deleteMap(req, res, next) {
  try {
    const mapId = req.body.id;
    const userId = req.session.userId;

    const toDelete = await selectMapById(mapId);
    l.info("toDelete @ updateMap", toDelete);
    if (toDelete instanceof Error)  // TODO: use switch case
      throw row;
    if (!toDelete)
      return res.status(404).end();
    if (toDelete.user_id != userId)
      return res.status(401).end();

    const deletedMap = await deleteMapById(mapId);
    if (deletedMap instanceof Error)
      throw deletedMap;

    res.status(200);
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

module.exports = {
  createMap,
  getMaps,
  updateMap,
  deleteMap
};

/* use this to receive userId through query string parameters

async function getMaps(req, res) {
  try {
    const userId = req.query.user_id;

    const validQS = validateQueryString(userId);

    if (validQS) {
      const rows = await fetchMapsByUserId(userId);

      res.send(rows);
    } else {
      throw new Error("query string is not a valid UUID", {
        cause: "InvalidUUID"
      });
    }
  } catch (err) {
    if (e.cause === "InvalidUUID") {
      l.error({ message: e.message, cause: e.cause });
      res.status(400).send(e.message);
    } else {
      l.error(err);
      throw new Error("unhandled exception");
    }
  }
}

*/

