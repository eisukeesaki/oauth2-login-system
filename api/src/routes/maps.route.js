const maps = require("express").Router();
const ensureAuthenticated = require("@utils/ensureAuthenticated.util")({
  redirectTo: "/authentication",
  setReturnTo: true
});
const { createMap, getMaps, updateMap, deleteMap } = require("@controllers/maps.controller");

maps.post("/maps",
  ensureAuthenticated,
  createMap
);

maps.get("/maps",
  ensureAuthenticated,
  getMaps
);

maps.put("/maps",
  ensureAuthenticated,
  updateMap
);

maps.delete("/maps",
  ensureAuthenticated,
  deleteMap
);

module.exports = maps;

