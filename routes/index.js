const express = require("express");
const router = express.Router();

// routers and controllers
const homeController = require("../controllers/home_controller");
const userRoute = require("./users");

router.get("/", homeController.home);
router.use("/users", userRoute);

module.exports = router;
