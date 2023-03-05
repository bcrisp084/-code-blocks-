const router = require("express").Router();
const auth = require("../config/authenticate");
const { User } = require("../models");

router.get("/", (req, res) => {
  res.render("landingPage", { title: "The Garage", style: "landingPage.css" });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    title: "signup",
    style: "signup.css",
    script: "signup.js",
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    title: "login",
    style: "signup.css",
    script: "login.js",
  });
});

router.get("/home", auth, async (req, res) => {
  const userData = await User.findByPk(req.session.userId, {
    attributes: { exclude: ["password"] },
  });
  const user = userData.get({ plain: true });
  res.render("home", {
    title: "The Garage",
    style: "home.css",
    script: "avatar.js",
    loggedIn: req.session.loggedIn,
    ...user,
  });
});

module.exports = router;
