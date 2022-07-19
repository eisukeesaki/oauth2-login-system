const maps = require("express").Router();

maps.get("/api/maps", (req, res) => {
  // expects ?owner_id=id
  console.log("req.query - ", req.query);

  // validate query param
  // TODO
  res.send(req.query);
});

module.exports = maps;

