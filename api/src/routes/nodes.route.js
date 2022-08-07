const nodes = require("express").Router();
const ensureAuthenticated = require("@utils/ensureAuthenticated.util")({
  redirectTo: "/authentication",
  setReturnTo: true
});
// const { createNode, getNodes, updateNode, deleteNode } = require("@controllers/nodes.controller");
const { createNode } = require("@controllers/nodes.controller");

nodes.post("/nodes",
  ensureAuthenticated,
  createNode
);

// nodes.get("/nodes",
//   ensureAuthenticated,
//   getNodes
// );

// nodes.put("/nodes",
//   ensureAuthenticated,
//   updateNode
// );

// nodes.delete("/nodes",
//   ensureAuthenticated,
//   deleteNode
// );

module.exports = nodes;

