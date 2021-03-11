const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
// used for session cookie
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const session = require("express-session");
// helps store session cookie data in Mongo DB
var MongoStore = require("connect-mongo").default;
const sassMiddleware = require("node-sass-middleware");

// setting up middlewares
app.use(
  sassMiddleware({
    src: "./public/scss",
    dest: "./public/css",
    debug: true, //set this to false during production
    outputStyle: "extended", // set it to "compressed" during production
    prefix:
      "/css" /* It will tell the sass middleware that any request file
    will always be prefixed with "/css" and this prefix should be ignored. */,
  })
);
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
    // MongoStore helps store the session cookie data in the db
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost:27017/socialMedia",
        autoRemove: "disabled",
      },
      (err) => {
        console.log(err || "session cookie data stored successfully");
      }
    ),
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
