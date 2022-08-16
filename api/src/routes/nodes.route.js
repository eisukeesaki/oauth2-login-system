const nodes = require("express").Router();
const ensureAuthenticated = require("@utils/ensureAuthenticated.util")({
  redirectTo: "/authentication",
  setReturnTo: true
});
const { createNode, getNodes, updateNode, deleteNode } = require("@controllers/nodes.controller");

nodes.post("/api/nodes",
  ensureAuthenticated,
  createNode
);

nodes.get("/api/nodes",
  ensureAuthenticated,
  getNodes
);

nodes.put("/api/nodes",
  ensureAuthenticated,
  updateNode
);

nodes.delete("/api/nodes",
  ensureAuthenticated,
  deleteNode
);

module.exports = nodes;

