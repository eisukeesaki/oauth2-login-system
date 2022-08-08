const { logger: l } = require("@utils/logger.util");
const { selectMapById } = require("@services/maps.service");
const { insertNode, selectNodesByMapId } =
  require("@services/nodes.service");

async function createNode(req, res, next) {
  try {
    const { map_id: mapId, parent_id: parentId, content } = req.body;
    const { userId } = req.session;

    const map = await selectMapById(mapId); // identifies that map the to-be-created-node will be associated with
    l.info("map @ createNode", map);
    if (map instanceof Error) // TODO: use switch case
      throw row;
    if (map.user_id != userId) // INFO: confirm session user's ownership of the map the to-be-created-node will be associated with
      return res.status(401).end();

    const created = await insertNode({ map_id: mapId, parent_id: parentId, content: content });
    if (created instanceof Error)
      throw created;

    res.status(201).send(created);
  } catch (err) {
    l.error(err);
    throw new Error("unhandled exception");
  }
}

async function getNodes(req, res) {
  try {
    const { userId } = req.session;
    const mapId = req.query.map_id;

    const map = await selectMapById(mapId);
    l.info("map @ getNodes", map);
    if (map.user_id != userId)
      return res.status(401).end();

    const nodes = await selectNodesByMapId(mapId);

    res.send(nodes);
  } catch (err) {
    l.error(err);
    throw new Error("unhandled exception");
  }
}

module.exports = {
  createNode,
  getNodes
};

