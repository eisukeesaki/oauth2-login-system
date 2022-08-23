const express = require("express");
const path = require("path");
const { logger: l, logResponse, logSession }
  = require("@utils/logger.util");
const views = require("express").Router();
const ensureAuthenticated = require("@utils/ensureAuthenticated.util")({
  redirectTo: "/authentication",
  setReturnTo: true
});

views.get("/",
  ensureAuthenticated,
  (req, res) => {
    res.send("if you are seeing this you have a valid login session");
  }
);

views.get("/authentication",
  (req, res, next) => {
    res.sendFile(__views + "/authentication.html");
  }
);

module.exports = views;

