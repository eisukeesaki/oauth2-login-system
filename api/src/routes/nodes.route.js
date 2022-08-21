const nodes = require("express").Router();
// const validateRequest = require("@utils/request-validation")();
const ensureAuthenticated = require("@utils/ensureAuthenticated.util")({
  // redirectTo: "/authentication",
  // setReturnTo: true
  setReturnTo: false
});
const { createNode, getNodes, updateNode, deleteNode } = require("@controllers/nodes.controller");

nodes.post("/api/nodes",
  ensureAuthenticated,
  createNode
);

nodes.get("/api/nodes",
  // validateRequest,
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

