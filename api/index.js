const pool = require("./src/db/index");
const testDbConn = require("./src/utils/db/test-db-conn");
const { logger: l } = require("./src/utils/logging/logger");
const express = require("express");

const app = express();
const port = process.env.PORT || 4242;

testDbConn(pool);

app.get("/", (req, res) => {
  l.info("detected request. request header:\n", req.headers);
  res.send("you have just made a GET request to /");
});

app.listen(port, () => {
  l.info("server is listening to port %s", port);
});

