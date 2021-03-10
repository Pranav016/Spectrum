// importing models
const User = require("../models/user");

// render profile page
module.exports.profile = (req, res) => {
  return res.render("user_profile", {
    title: "Profile",
  });
};

// render posts
module.exports.posts = (req, res) => {
  return res.end("<h1>User Posts</h1>");
};

// render sign-up page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};

// render sign-in page
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Sign In",
  });
};

// get sign-up data
module.exports.create = (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(`Error in sign-up controller: ${err}`);
      return;
    }
    if (!user) {
      User.create(req.body, (err, user) => {
        if (err) {
          console.log(`Error in sign-up controller: ${err}`);
          return res.redirect("back");
        } else {
          return res.redirect("/users/sign-in");
        }
      });
    } else {
      return res.redirect("back");
    }
  });
};

// sign-in and create session for the user
module.exports.createSession = (req, res) => {
  return res.redirect("/");
};
