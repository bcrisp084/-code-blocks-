const router = require("express").Router();
const auth = require("../config/authenticate");
const { User, Images } = require("../models");
let user;

router.get("/", (req, res) => {
  res.render("landingPage", { title: "Code Blocks", style: "landingPage.css" });
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
  user = userData.get({ plain: true });
  console.log("user", user);
  res.render("home", {
    title: "Code Blocks",
    style: "home.css",
    loggedIn: req.session.loggedIn,
    ...user,
  });
});

router.get("/profile", auth, async (req, res) => {
  try {
    const userPhotos = await Images.findAll({
      where: {
        user_id: req.session.userId,
      },
    });
    const photos = userPhotos.map((photo) => photo.get({ plain: true }));
    res.render("profile", {
      style: "profile.css",
      ...user,
      photos,
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/settings", auth, (req, res) => {
  res.render("settings", {
    style: "settings.css",
    ...user,
  });
});

module.exports = router;
