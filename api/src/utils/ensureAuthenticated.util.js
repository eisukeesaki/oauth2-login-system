module.exports = function ensureAuthenticated(options) {
  if (typeof options == 'string') {
    options = { redirectTo: options }
  }
  options = options || {};

  var url = options.redirectTo;
  var setReturnTo = (options.setReturnTo === undefined) ? true : options.setReturnTo;

  return function(req, res, next) {
    const { logger: l, logSession } = require("@utils/logger.util");
    l.info("req.session @ ensureAuthenticated", req.session);

    // if (!req.isAuthenticated || !req.isAuthenticated()) { // unmodified original
    if (req.session && !req.session.userId) {
      if (setReturnTo) {
        // if (setReturnTo && req.session) { // unmodified original

        req.session.returnTo = req.originalUrl || req.url;

        l.info("req.session.returnTo after its assignation @ ensureAuthenticated", req.session.returnTo);
      }
      l.info("Client's session is not isAuthenticated. redirecting client to %s", url);
      return res.redirect(url);
    }
    l.info("Client's session is isAuthenticated. Passing contorl to next middleware");
    next();
  }
}

/**
 * Ensure that a user is logged in before proceeding to next route middleware.
 *
 * This middleware ensures that a user is logged in.  If a request is received
 * that is unauthenticated, the request will be redirected to a login page (by
 * default to `/login`).
 *
 * Additionally, `returnTo` will be be set in the session to the URL of the
 * current request.  After authentication, this value can be used to redirect
 * the user to the page that was originally requested.
 *
 * Options:
 *   - `redirectTo`   URL to redirect to for login, defaults to _/login_
 *   - `setReturnTo`  set redirectTo in session, defaults to _true_
 *
 * Examples:
 *
 *     app.get('/profile',
 *       ensureLoggedIn(),
 *       function(req, res) { ... });
 *
 *     app.get('/profile',
 *       ensureLoggedIn('/signin'),
 *       function(req, res) { ... });
 *
 *     app.get('/profile',
 *       ensureLoggedIn({ redirectTo: '/session/new', setReturnTo: false }),
 *       function(req, res) { ... });
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */
