const maps = require("express").Router();
const ensureAuthenticated = require("@utils/ensureAuthenticated.util")({
  redirectTo: "/authentication",
  setReturnTo: true
});
const { createMap, getMapsByUserId } = require("@controllers/maps.controller");

maps.post("/maps",
  ensureAuthenticated,
  createMap
);

// maps.get("/api/maps",
//   getMapsByUserId
// );

module.exports = maps;

