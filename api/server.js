require("module-alias/register");

const { logger: l, logRequest: requestLogger } =
  require("@utils/logger.util");
const db = require("@boot/db.boot");
const testDbConn = require("@utils/test-db-conn.util");
const path = require("path");
const express = require("express");
const session = require("express-session");
const passport = require("@boot/auth.google.boot");
const viewsRoute = require("@routes/views.route");
const mapsRoute = require("@routes/maps.route");
const authRoute = require("@routes/auth.route");
const app = express();
const port = process.env.PORT || 4242;

global.__views = path.resolve(__dirname, "src", "views");

testDbConn(db);

app.use(requestLogger);
app.use(express.static("@views"));

app.use(session({
  secret: process.env["SESSION_SECRET"]
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(viewsRoute);
app.use(mapsRoute);
app.use(authRoute);

app.listen(port, () => {
  l.info("server is listening to port %s", port);
});

