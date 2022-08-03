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
    passport.authenticate("google", {
      session: true,
      // successRedirect: "/editor",
      failureRedirect: "/authentication",
      successMessage: true,
      failureMessage: true
    }, (err, user, info) => {
      logSession("callback of passport.authenticate()")(req, res, next);
      l.info("user @ callback of passport.authenticate()", user);

      if (err) return next(err);
      if (!user) return res.redirect("/authentication");

      req.session.userId = user.id;
      logSession("after setting req.session.userId @ callback passed to passport.authenticate()")(req, res, next);

      res.redirect(req.session.returnTo);
      delete req.session.returnTo;

      next();
    })(req, res, next);
  }
);

module.exports = auth;

