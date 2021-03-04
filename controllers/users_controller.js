// render profile page
module.exports.profile = (req, res) => {
  return res.end("<h1>User Profile</h1>");
};

// render posts
module.exports.posts = (req, res) => {
  return res.end("<h1>User Posts</h1>");
};

// render sign-up page
module.exports.signUp = (req, res) => {
  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};

// render sign-in page
module.exports.signIn = (req, res) => {
  return res.render("user_sign_in", {
    title: "Sign In",
  });
};

// get sign-up data
moduel.exports.create = (req, res) => {};

// sign-in and create session for the user
moduel.exports.signIn = (req, res) => {};
