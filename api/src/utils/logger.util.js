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
  logger.info("request: %o", {
    protocol: req.protocol,
    method: req.method,
    URL: req.originalUrl,
    query: req.query,
    params: req.params,
    cookies: req.cookies,
    headers: req.headers,
    body: req.body,
    // session: req.session.passport
  });
  next();
}

function logResponse(req, res, next) {
  logger.info("response", {
    // routerStack: res.app._router.stack,
    params: res.app._router.params,
    _params: res.app._router._params,
    headersSent: res.headersSent,
    locals: res.locals
  });
  next();
}

function logSession(req, res, next) {
  logger.info("req.session", req.session);
  logger.info("req.user", req.user);
  logger.info("req._passport", req._passport);
  next();
}

module.exports = {
  logger,
  logRequest,
  logResponse,
  logSession
}

