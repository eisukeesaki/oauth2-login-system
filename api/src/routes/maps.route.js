const maps = require("express").Router();
const ensureAuthenticated = require("@utils/ensureAuthenticated.util")({
  redirectTo: "/authentication",
  setReturnTo: true
});
const { createMap, getMaps } = require("@controllers/maps.controller");

maps.post("/maps",
  ensureAuthenticated,
  createMap
);

maps.get("/maps",
  ensureAuthenticated,
  getMaps
);

module.exports = maps;

