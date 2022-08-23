const { logger: l, logSession } = require("@utils/logger.util");
const auth = require("express").Router();
const passport = require("@boot/auth.google.boot");

auth.get("/authentication/federated/google",
  (req, res, next) => {
    logSession("/authentication/federated/google")(req, res, next);
  },
  passport.authenticate("google", {
    session: true
  })
);

auth.get("/oauth2/redirect/google",
  (req, res, next) => {
    logSession("/oauth2/redirect/google")(req, res, next);
  },
  (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      logSession("callback of passport.authenticate()")(req, res, next);
      l.info("user @ callback of passport.authenticate()", user);

      if (err) return next(err);
      if (!user) return res.status(401).end();

      req.login(user, (err) => {
        if (err) return next(err);
      });

      req.session.userId = user.id;
      logSession("after calling req.login() and setting req.session.userId @ callback passed to passport.authenticate()")(req, res, next);
      l.info("req.user @ after req.login()", req.user);

      l.info("req.session @ before redirect @ auth.get('oauth2/redirect/google')", req.session);
      if (!req.session.returnTo)
        req.session.returnTo = "/";
      res.redirect(req.session.returnTo);
      delete req.session.returnTo;
    })(req, res, next);
  }
);

module.exports = auth;

