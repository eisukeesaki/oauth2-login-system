const express = require("express");
const { logger: l } = require("./src/utils/logging/logger");
const app = express();

const port = process.env.PORT || 4242;

require("./src/db");

app.get("/", (req, res) => {
  res.send("you have just made a GET request to /");
});

app.listen(port, () => {
  l.info("server is listening to port %s", port);
});

