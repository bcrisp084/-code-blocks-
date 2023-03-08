const router = require("express").Router();
const googleRoute = require("./googleLogin");
const userRoutes = require("./userRoute");
const imageRoute = require("./imageApi");

router.use("/image", imageRoute);
router.use("/user", userRoutes);
router.use("/", googleRoute);
module.exports = router;
