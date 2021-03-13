const express = require("express");
const passport = require("passport");
const router = express.Router();

// controller
const postsController = require("../controllers/posts_controller");

// post routes
router.post("/create", passport.checkAuthentication, postsController.create);
router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  postsController.destroy
);

module.exports = router;
