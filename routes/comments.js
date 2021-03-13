const express = require("express");
const passport = require("passport");
const router = express.Router();

// controllers
const commentsController = require("../controllers/comments_controller");

// routes
router.post("/create", passport.checkAuthentication, commentsController.create);
router.get(
	"/destroy/:id",
	passport.checkAuthentication,
	commentsController.destroy
);

module.exports = router;
