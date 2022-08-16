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

    const toDel = await selectMapById(mapId);
    l.info("toDel @ updateMap", toDel);

    if (toDel instanceof Error && toDel.cause === "Query failure")
      return res.send(500);
    if (toDel === false)
      return res.status(404).end();
    if (toDel.user_id != userId)
      return res.status(401).end();

    const deledMap = await deleteMapById(mapId);
    l.info("deledMap @ deleteMap", deledMap);

    if (deledMap instanceof Error && deledMap.cause === "Query failure")
      return res.status(500).end();
    if (deledMap === false)
      return res.status(500).end(); // TODO: cause unkonwn!

    if (deledMap === true)
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

