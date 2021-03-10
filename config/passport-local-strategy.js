const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");

// passport-local strategy for authentication, this works as our middleware
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      /*By default, LocalStrategy expects to find credentials in parameters named 'username' and 'password'.So we use 'usernameField' which is a prededfined parameter to change our unique credential*/
    },
    (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          console.log(
            `error in passport-local strategy during authentication: ${err}`
          );
        }
        if (!user || user.password != password) {
          return done(null, false);
        }
        return done(null, user);
        /* to read more about done callback
        http://www.passportjs.org/docs/configure/ */
      });
    }
  )
);

// serializing the user to authenticate user and to create session by storing the user id in the cookie
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

// deserializing helps identify a user from the id in the cookie whenever a new request is made
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    return done(err, user);
  });
});

// making middleware to check if user is authenticated
passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    /* if user is signed in, pass the request to the next
    function (that will be the controller function) */
    return next();
  } else {
    // user not signed in
    return res.redirect("/users/sign-in");
  }
};

// making middleware to set info in req to locals
passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    /* req.user contains the current signed in
    user from the session cookie and we are sending
    this to the locals to use it in the views */
    res.locals.user = req.user;
  }
  return next();
};

module.exports = passport;
