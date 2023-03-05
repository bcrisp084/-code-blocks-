const router = require("express").Router();
const googleRoute = require("./api/googleLogin");
const userRoutes = require("./api");
const homeRoutes = require("./homeRoute");

router.use("/api", userRoutes);
router.use("/", homeRoutes);
router.use("/", googleRoute);

module.exports = router;
