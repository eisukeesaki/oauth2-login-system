require("module-alias/register");

const { logger: l, logRequest, logResponse, logSession } =
  require("@utils/logger.util");
const db = require("@boot/db.boot");
const testDbConn = require("@utils/test-db-conn.util");
const path = require("path");
const express = require("express");
const session = require("express-session");
const passport = require("@boot/auth.google.boot");
const redis = require("redis");
const connectRedis = require("connect-redis");
// const flash = require("connect-flash");
const authRoute = require("@routes/auth.route");
const viewsRoute = require("@routes/views.route");
const mapsRoute = require("@routes/maps.route");
const nodesRoute = require("@routes/nodes.route");
const app = express();
const port = process.env.PORT || 4242;

global.__views = path.resolve(__dirname, "src", "views");

const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: "127.0.0.1",
    port: 6379
  }
});
const RedisStore = connectRedis(session);

redisClient.on("connect", () => {
  l.info("Redis client connected to server");
});
redisClient.on("error", (err) => {
  l.info("Redis error: ", err);
});

(async function initRedis() {
  try {
    await redisClient.connect();
  } catch (err) {
    l.info("Redis client failed to initiate connection to server", err);
  }
})();

testDbConn(db);

app.use(express.urlencoded({ extended: false }));
app.use(express.json({
  inflate: true, // handle compressed bodies
  limit: 1000, // max body size to accept
  strict: true, // only accept arrays and objects
  type: "application/json" // what media type to parse
}));

app.use(logRequest);

app.use(express.static("@views"));
app.use(express.static(path.join('..', 'client', 'build')));

app.use(session({
  secret: process.env["SESSION_SECRET"], // what to encrypt session data with?
  name: "SID", // name of session cookie?
  resave: false, // force save unmodified session object BACK TO store?
  saveUninitialized: false, // force save new, unmodified session object to store?
  secret: process.env["SESSION_SECRET"],
  unset: "keep", // what to do with session in store when unsetting req.session?
  cookie: {
    expires: new Date("2022-08-31T16:59:59"),
    httpOnly: true,
    path: "/",
    sameSite: false, // investigate security vulnerabilities (in order for Sign in with Google to work, this must be set to false.)
    secure: false,
  },
  store: new RedisStore({
    host: "127.0.0.1",
    port: 6379,
    client: redisClient,
    ttl: 86400
  })
}));

// app.use(flash());

app.use(passport.initialize());
app.use(passport.session({ pauseStream: true }));

app.use(authRoute, viewsRoute);
app.use(mapsRoute, nodesRoute);

app.listen(port, () => {
  l.info("server is listening to port %s", port);
});

