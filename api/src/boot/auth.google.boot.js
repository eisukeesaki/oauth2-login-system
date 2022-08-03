const { logger: l } = require("@utils/logger.util");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

const strategyOptions = {
  clientID: process.env["GOOGLE_CLIENT_ID"],
  clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
  callbackURL: "http://127.0.0.1:4242/oauth2/redirect/google",
  scope: ["profile", "email"]
  // passReqToCallBack: true
}

/*

    flow
        check if user has ever logged in
            if has logged in before
                retrieve the user record linked to the Google account
            else
                create a new user record and
                    link it to the Google account
        handle errors and exceptions
        log the user in

*/
async function findOrCreateGoogle(accessToken, refreshToken, profile, done) {
  try {
    l.info("profile ", profile);

    const pool = require("@boot/db.boot");
    const qs = "SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2";
    const qp = [profile.provider, profile.id];

    const res = await pool.query(qs, qp);
    l.info("res - SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2 ", res);

    if (res.rowCount) { // if given Google profile IS associated with a record in federated_credentials table, retrieve a user record out of users table, using the PK of the federated_credentials record. Then assign the retrieved user to req.user.
      l.info("user has signed in with Google before. retrieving user record...");

      const qs = "SELECT * FROM users WHERE id = $1";
      const qp = [res.rows[0].user_id]; // might fail

      const { rows } = await pool.query(qs, qp);

      const user = {
        id: rows[0].id,
        name: rows[0].name
      };
      l.info("rows - SELECT * FROM users WHERE id = $1 ", rows)

      return done(null, user);
    } else { // If given Google profile is NOT associated with a record in federated_credentials table, create new users table record and associate it with Google profile (Create new federated_credentials to store the association). Then assign newly created user to req.user.
      l.info("user has never signed in with Google. creating records in users and federated_credentials...");

      const qsu = "INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id";
      const qpu = [profile.emails[0].value, profile.displayName];

      const userId = (await pool.query(qsu, qpu)).rows[0].id;

      const psfc = "INSERT INTO federated_credentials (user_id, provider, subject) VALUES ($1, $2, $3)";
      const qpfc = [userId, profile.provider, profile.id];

      await pool.query(psfc, qpfc);

      const user = {
        id: userId,
        name: profile.displayName
      };

      return done(null, user);
    }
  } catch (error) {
    l.info("unhandled exception %s", JSON.stringify(error, null, 2));
    // TODO: handle exceptions raised by specific causes
    return done(error); // TODO: test reaching this code.
  }
}

const googleStrategy = new GoogleStrategy(strategyOptions, findOrCreateGoogle);

passport.use(googleStrategy);

passport.serializeUser((req, user, done) => {
  l.info("serializing user into session...");

  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const pool = require("@boot/db.boot");
    const qs = "SELECT * FROM users WHERE id = $1";
    const qp = [id];

    const { rows } = await pool.query(qs, qp);

    l.info("database response for SELECT * FROM users WHERE id = $1\n%o", rows);

    if (!rows.length)
      return done(new Error("failed to deserialize user. users record not retrieved."));

    const user = {
      id: rows[0].id,
      name: rows[0].name
    };
    l.info("deserializing user out of session...\n%o\n", user);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;

