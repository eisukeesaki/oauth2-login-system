const { logger: l, logResponse, logSession }
  = require("@utils/logger.util");
const views = require("express").Router();
const ensureAuthenticated = require("@utils/ensureAuthenticated.util")({
  redirectTo: "/authentication",
  setReturnTo: true
});

views.get("/",
  (req, res, next) => {
    res.send("you have just made a GET request to /");
  }
);

views.get("/maplist",
  ensureAuthenticated,
  (req, res, next) => {
    res.sendFile(__views + "/maplist.html");
  }
);

views.get("/editor",
  ensureAuthenticated,
  (req, res, next) => {
    l.info("req.session @ GET /editor", req.session);
    res.sendFile(__views + "/editor.html");
  }
);

views.get("/authentication",
  (req, res, next) => {
    res.sendFile(__views + "/authentication.html");
  }
);

module.exports = views;

