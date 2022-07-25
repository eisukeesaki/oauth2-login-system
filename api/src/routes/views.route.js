const { logSession } = require("@utils/logger.util");
const views = require("express").Router();

views.get("/", (req, res) => {
  res.send("you have just made a GET request to /");
});

views.get("/maplist",
  logSession,
  (req, res) => {
    res.sendFile(__views + "/maplist.html");
  });

views.get("/editor", (req, res) => {
  res.sendFile(__views + "/editor.html");
});

views.get("/authentication", (req, res) => {
  res.sendFile(__views + "/authentication.html");
});

module.exports = views;

