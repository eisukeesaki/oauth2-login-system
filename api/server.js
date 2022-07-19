require("module-alias/register");

const { logger: l, logRequest: requestLogger } = require("@utils/logger.util");
const express = require("express");
const pool = require("@services/db.service");
const testDbConn = require("@utils/test-db-conn.util");
const path = require("path");
const viewsRoute = require("@routes/views.route");
const mapsRoute = require("@routes/maps.route");

global.__views = path.resolve(__dirname, "src", "views");

const app = express();
const port = process.env.PORT || 4242;

testDbConn(pool);

app.use(requestLogger);
app.use(express.static("@views"));
app.use(viewsRoute);
app.use(mapsRoute);

app.listen(port, () => {
  l.info("server is listening to port %s", port);
});
