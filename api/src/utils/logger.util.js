const bunyan = require("bunyan");
const path = require("path");
const { path: root } = require("app-root-path");

const logger = bunyan.createLogger({
  name: "MindNet",
  streams: [
    {
      level: "info",
      stream: process.stdout
    },
    {
      level: "warn",
      stream: process.stderr,
      path: path.resolve(root, "logs.json")
    },
    {
      level: "debug",
      stream: process.out,
      path: path.resolve(root, "logs.json")
    }
  ]
});

function logRequest(req, res, next) {
  logger.info("captured incoming request.\n" +
    "req.protocol: %o\n" +
    "req.method: %o\n" +
    "req.hostname: %o\n" +
    "req.path: %o\n" +
    "req.originalUrl: %o\n" +
    "req.baseUrl: %o\n" +
    "req.params: %o\n" +
    "req.query: %o\n" +
    "req.ip: %o\n" +
    "req.ips: %o\n" +
    "req.subdomains: %o\n" +
    "req.route: %o\n" +
    // "req.app: %o\n" +
    "req.fresh: %o\n" +
    "req.secure: %o\n" +
    "req.stale: %o\n" +
    "req.xhr: %o\n" +
    "req.user: %o\n" +
    "req.isAuthenticated: %o\n" +
    "req.cookies %o\n" +
    "req.signedCookies %o\n" +
    "req.headers: %o\n" +
    "req.body: %o\n",
    req.protocol,
    req.method,
    req.hostname,
    req.path,
    req.originalUrl,
    req.baseUrl,
    req.params,
    req.query,
    req.ip,
    req.ips,
    req.subdomains,
    req.route,
    // req.app,
    req.fresh,
    req.secure,
    req.stale,
    req.xhr,
    req.user,
    req.isAuthenticated,
    req.cookies,
    req.signedCookies,
    req.headers,
    req.body
  );
  next();
}

function logResponse(msg) {
  return function(req, res, next) {
    logger.info(`res.... @ ${msg}\n` +
      // "res.app: %o\n" +
      "res.headersSent: %o\n" +
      "res.locals: %o\n",
      // res.app,
      res.headersSent,
      res.locals
    );
    next();
  }
}

function logSession(msg) {
  return function(req, res, next) {
    const message = `req.session @ ${msg}\n`;

    logger.info(message, req.session);

    next();
  }
}

module.exports = {
  logger,
  logRequest,
  logResponse,
  logSession
}

