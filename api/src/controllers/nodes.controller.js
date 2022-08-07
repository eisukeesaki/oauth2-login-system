const { logger: l } = require("@utils/logger.util");
// const { insertNode, selectNodesByUserId, selectNodeById, updateNodeById, deleteNodeById } =
const { selectMapById } = require("@services/maps.service");
const { insertNode } =
  require("@services/nodes.service");

async function createNode(req, res, next) {
  try {
    const { map_id: mapId, parent_id: parentId, content } = req.body;
    const { userId } = req.session;

    const map = await selectMapById(mapId); // identifies that map the to-be-created-node will be associated with
    l.info("map @ createNode", map);
    if (map instanceof Error) // TODO: use switch case
      throw row;
    if (map.user_id != userId) // confirm session user's ownership of the map the to-be-created-node will be associated with
      return res.status(401).end();

    const created = await insertNode({ map_id: mapId, parent_id: parentId, content: content });
    if (created instanceof Error)
      throw created;

    res.status(201).send(created);
  } catch (err) {
    l.error(err);
    // TODO: determine possible errors and handle them specifically
    throw new Error("unhandled exception");
  }
}

module.exports = {
  createNode
  // getNodes,
  // updateNode,
  // deleteNode
};

