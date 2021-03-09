const express = require("express");
const passport = require("passport");
const router = express.Router();

// controller
const usersController = require("../controllers/users_controller");

// users routes
router.get("/profile", usersController.profile);
router.get("/posts", usersController.posts);
router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);
router.post("/create", usersController.create);
// using passport as middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/sign-in",
  }),
  usersController.createSession
);

module.exports = router;
