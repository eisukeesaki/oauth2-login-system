const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("you have just made a GET request to /");
});

module.exports = router;

