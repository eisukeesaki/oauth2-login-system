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

app.use(logRequest);

app.use(express.urlencoded({ extended: false }));

app.use(express.static("@views"));

app.use(session({
  secret: process.env["SESSION_SECRET"],
  name: "SID",
  resave: false,
  saveUninitialized: true,
  secret: process.env["SESSION_SECRET"],
  unset: "keep",
  cookie: {
    expires: new Date("2022-08-31T16:59:59"),
    httpOnly: true,
    path: "/",
    sameSite: true,
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

app.use(authRoute);
app.use(viewsRoute);
app.use(mapsRoute);

app.listen(port, () => {
  l.info("server is listening to port %s", port);
});

