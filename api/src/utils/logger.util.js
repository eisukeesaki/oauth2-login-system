const bunyan = require("bunyan");
const path = require("path");
const { path: root } = require("app-root-path");

const level = process.env.LOGGING_LEVEL || "info";

const logger = bunyan.createLogger({
  name: "MindNet",
  streams: [
    {
      level,
      stream: process.stdout
    },
    {
      level,
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

function logResponse(res, next) {
  logger.info("response", {
    // routerStack: res.app._router.stack,
    params: res.app._router.params,
    _params: res.app._router._params,
    headersSent: res.headersSent,
    locals: res.locals
  });
  next();
}

module.exports = {
  logger,
  logRequest,
  logResponse
}

