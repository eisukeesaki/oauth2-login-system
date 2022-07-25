const maps = require("express").Router();
const { getMapsByUserId } = require("@controllers/maps.controller");

maps.get("/api/maps", getMapsByUserId);

module.exports = maps;

