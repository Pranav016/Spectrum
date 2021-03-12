const express = require("express");
const passport = require("passport");
const router = express.Router();

// controllers
const commentsController = require("../controllers/comments_controller");

// routes
router.post("/create", passport.checkAuthentication, commentsController.create);

module.exports = router;
