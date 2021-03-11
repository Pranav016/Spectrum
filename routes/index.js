const express = require("express");
const router = express.Router();

// acquiring routers and controllers
const homeController = require("../controllers/home_controller");
const userRoute = require("./users");
const postRoute = require("./posts");

// middleware
router.get("/", homeController.home);
router.use("/users", userRoute);
router.use("/posts", postRoute);

module.exports = router;
