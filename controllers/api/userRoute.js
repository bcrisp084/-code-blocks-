const router = require("express").Router();
const { User } = require("../../models");
const multer = require("multer");
const { memoryStorage } = require("multer");
const upload = multer({ storage: memoryStorage });

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      res.status(200).json({ message: "You are now signed up" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", upload.single("photo"), async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log(req.body);
    if (!userData) {
      res.status(404).json({ message: "Incorrect email or password" });
      return;
    }
    const validUser = await userData.passwordValidate(req.body.password);
    if (!validUser) {
      res.status(404).json({ message: "Incorrect password. Please try again" });
    }
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      res
        .status(200)
        .json({ user: userData, message: "You are now logged in." });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
