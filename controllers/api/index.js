const router = require("express").Router();
const googleRoute = require("./googleLogin");
const apiRoutes = require("./userRoute");

router.use("/user", apiRoutes);
router.use("/", googleRoute);
module.exports = router;
