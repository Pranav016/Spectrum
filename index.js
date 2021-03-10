const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
// used for session cookie
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const session = require("express-session");

// setting up middlewares
app.use(express.urlencoded({ extended: true }));
/*This method is inbuilt in express to recognize
the incoming Request Object as strings or arrays*/
app.use(express.static("public"));

// setup view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// cookies and session creation
app.use(cookieParser());
app.use(
  session({
    name: "SocialMedia",
    secret: "Social-Media",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
// checks cookie for authentication and transfers the user info from req object to locals for view
app.use(passport.setAuthenticatedUser);

// routes
const homeRoute = require("./routes"); //by default requires index file

app.use("/", homeRoute);

// starting the server
app.listen(port, function (err) {
  if (err) {
    console.log(`Error: ${err}`);
  }
  console.log(`Server started on port ${port}`);
});
