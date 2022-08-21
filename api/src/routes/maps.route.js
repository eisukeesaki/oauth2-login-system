const maps = require("express").Router();
const ensureAuthenticated = require("@utils/ensureAuthenticated.util")({
  // redirectTo: "/authentication",
  // setReturnTo: true
  setReturnTo: false
});
const { createMap, getMaps, updateMap, deleteMap } = require("@controllers/maps.controller");

maps.post("/api/maps",
  ensureAuthenticated,
  createMap
);

maps.get("/api/maps",
  ensureAuthenticated,
  getMaps
);

maps.put("/api/maps",
  ensureAuthenticated,
  updateMap
);

maps.delete("/api/maps",
  ensureAuthenticated,
  deleteMap
);

module.exports = maps;

