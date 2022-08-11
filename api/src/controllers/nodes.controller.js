const { logger: l } = require("@utils/logger.util");
const { selectMapById } = require("@services/maps.service");
const { insertNode, selectNodesByMapId, selectNodeById, updateNodeById, deleteNodeById } =
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

    if (map instanceof Error && map.cause === "Query failure")
      return res.status(500).end();
    if (map === false)
      return res.status(404).end();
    if (map.user_id != userId)
      return res.status(401).end();

    const nodes = await selectNodesByMapId(mapId);

    if (nodes instanceof Error && nodes.cause === "Query failure")
      return res.status(500).end();
    if (nodes === false)
      return res.status(404).end();

    res.status(200).send(nodes);
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

    if (toUpdate instanceof Error && toUpdate.cause === "Query failure")
      return res.status(500).end();
    if (toUpdate === false)
      return res.status(404).end();
    if (toUpdate.user_id != userId)
      return res.status(401).end();
    if (toUpdate.content == content && toUpdate.parent_id == parentId)
      return res.status(200).send(toUpdate); // TODO: more appropriate response?

    const updated = await updateNodeById({ id: nodeId, content: content, parent_id: parentId });
    l.info("updated @ updateNode", updated);

    if (updated instanceof Error && updated.cause === "Query failure")
      return res.status(500).end();
    if (updated === false)
      return res.status(500).end(); // TODO: cause unkonwn!

    res.status(201).send(updated);
  } catch (err) {
    l.error(err);
    throw new Error("unhandled exception");
  }
}

async function deleteNode(req, res) {
  try {
    const { id } = req.body;
    const { userId } = req.session;

    const toDel = await selectNodeById(id);
    l.info("toDel @ deleteNode", toDel);

    if (toDel instanceof Error && toDel.cause === "Query failure")
      return res.status(500).end();
    if (toDel === false)
      return res.status(404).end();
    if (toDel.user_id != userId)
      return res.status(401).end();

    const deledNode = await deleteNodeById(id);
    l.info("deledNode @ deleteMap", deledNode);

    if (deledNode instanceof Error && deledNode.cause === "Query failure")
      return res.status(500).end();
    if (deledNode === false)
      return res.status(500).end(); // TODO: cause unkonwn!

    if (deledNode === true)
      res.status(200).end();
  } catch (err) {
    l.error(err);
    throw new Error("unhandled exception");
  }
}

module.exports = {
  createNode,
  getNodes,
  updateNode,
  deleteNode
};

