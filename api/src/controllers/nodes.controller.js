const { logger: l } = require("@utils/logger.util");
const { selectMapById } = require("@services/maps.service");
const { insertNode, selectNodeByMapId, selectNodeById, updateNodeById, deleteNodeById } =
  require("@services/nodes.service");

async function createNode(req, res, next) {
  try {
    const { map_id: mapId, parent_id: parentId, content } = req.body;
    const { userId } = req.session;

    const map = await selectMapById(mapId);
    l.info("map @ createNode", map);

    if (map instanceof Error && map.cause === "Query failure")
      return res.status(500).end();
    if (map === false)
      return res.status(404).end();
    if (map.user_id != userId)
      return res.status(401).end();

    const created = await insertNode({ user_id: userId, map_id: mapId, parent_id: parentId, content: content });

    if (created instanceof Error && created.cause === "Query failure")
      return res.status(500).end();
    if (created === false)
      return res.status(500).end(); // TODO: reason unkown!

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

async function updateNode(req, res) {
  try {
    const { id: nodeId, content, parent_id: parentId } = req.body;
    const userId = req.session.userId;
    l.info("nodeId @ updateNode", nodeId);
    l.info("content @ updateNode", content);

    const toUpdate = await selectNodeById(nodeId);
    l.info("toUpdate @ updateNode", toUpdate);
    if (toUpdate instanceof Error) // TODO: use switch case
      throw row;
    else if (!toUpdate)
      return res.status(404).end();
    else if (toUpdate.user_id != userId)
      return res.status(401).end();
    else if (toUpdate.content == content && toUpdate.parent_id == parentId) {
      return res.send(toUpdate); // TODO: more appropriate response?
    }

    const updated = await updateNodeById({ id: nodeId, content: content, parent_id: parentId });
    if (updated instanceof Error)
      throw updated;

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

async function deleteNode(req, res) {
  try {
    const { id } = req.body;
    const { userId } = req.session;

    const toDel = await selectNodeById(id);
    l.info("toDel @ deleteNode", toDel);

    if (toDel instanceof Error)  // TODO: use switch case
      throw toDel;
    else if (!toDel)
      return res.status(404).end();
    else if (toDel.user_id != userId)
      return res.status(401).end();

    const deledNode = await deleteNodeById(id);
    if (deledNode instanceof Error)
      throw deledNode;

    res.status(200).end();
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
  createNode,
  getNodes,
  updateNode,
  deleteNode
};

