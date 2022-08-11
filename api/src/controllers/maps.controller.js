const { logger: l } = require("@utils/logger.util");
const { insertMap, selectMapsByUserId, selectMapById, updateMapById, deleteMapById } =
  require("@services/maps.service");

async function createMap(req, res, next) {
  try {
    const title = req.body.title;
    const userId = req.session.userId;

    const created = await insertMap([title, userId]);
    l.info("created @ createMap", created);

    if (created instanceof Error && created.cause === "Query failure")
      return res.status(500).end();
    if (created === false)
      return res.status(500).end(); // TODO: reason unkown!

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
    l.info("got @ getMaps", got);

    if (got instanceof Error && got.cause === "Query failure")
      return res.status(500).end();
    if (got === false)
      return res.status(404).end();

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
      return res.status(500).end();
    if (toUpdate === false)
      return res.status(404).end();
    if (toUpdate.user_id != userId)
      return res.status(401).end();
    if (toUpdate.title == title)
      return res.status(200).send(toUpdate); // TODO: more appropriate response?

    const updated = await updateMapById(mapId, title);
    l.info("updated @ updateMap", updated);

    if (updated instanceof Error && updated.cause === "Query failure")
      return res.status(500).end();
    if (updated === false)
      return res.status(500).end(); // TODO: cause unkonwn!

    res.status(201).send(updated);
  } catch (err) {
    l.error(err);
    throw new Error("[FATAL] unhandled exception");
  }
}

async function deleteMap(req, res, next) {
  try {
    const mapId = req.body.id;
    const userId = req.session.userId;

    const toDelete = await selectMapById(mapId);
    l.info("toDelete @ updateMap", toDelete);

    if (toDelete instanceof Error && toDelete.cause === "Query failure")
      return res.send(500);
    if (toDelete === false)
      return res.status(404).end();
    if (toDelete.user_id != userId)
      return res.status(401).end();

    const deletedMap = await deleteMapById(mapId);
    l.info("deletedMap @ deleteMap", deletedMap);

    if (deletedMap instanceof Error && deletedMap.cause === "Query failure")
      return res.status(500).end();
    if (deletedMap === false)
      return res.status(500).end(); // TODO: cause unkonwn!

    if (deletedMap === true)
      res.status(200).end();
  } catch (err) {
    l.error(err);
    throw new Error("[FATAL] unhandled exception");
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

