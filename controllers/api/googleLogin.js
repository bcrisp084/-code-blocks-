const passport = require("passport");
const router = require("express").Router();
const auth = require("../../config/authenticate");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/redirect",
  auth,
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/home");
  }
);

module.exports = router;
