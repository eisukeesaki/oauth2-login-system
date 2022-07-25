const auth = require("express").Router();
const passport = require("@boot/auth.google.boot");

auth.get("/authentication/federated/google",
  passport.authenticate("google"),
);

auth.get("/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/maplist",
    failureRedirect: "/authenticateion"
  })
);

module.exports = auth;

/*

    redirect user to Google's authentication server
        there, user will:
            1. get authenticated
            2. send a consent to Google (consent to allow us to access their data which are stored on Google's servers)
            3. get redirected to our redirect endpoint
            4. make a request to our delegate 
        in order to allow users to get their identities validated by Google


    make a request on behalf of the user to retrieve the user's Google proile information
    make a request to Google's resource server

*/
