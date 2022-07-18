const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("you have just made a GET request to /");
});

router.get("/maplist", (req, res) => {
  res.sendFile(__views + "/maplist.html");
});

router.get("/editor", (req, res) => {
  res.sendFile(__views + "/editor.html");
});

router.get("/registration", (req, res) => {
  res.sendFile(__views + "/registration.html");
});

router.get("/authentication", (req, res) => {
  res.sendFile(__views + "/authentication.html");
});

module.exports = router;

