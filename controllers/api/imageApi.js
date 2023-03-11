const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const { Images } = require("../../models");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__basedir}/public/uploads`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post("/form", upload.single("photo"), async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.send("Please choose a file to upload");
    }
    console.log("req.body", req.body);
    console.log("req.body", req.file);
    const addImage = await Images.create({
      image_type: req.file.mimetype,
      name: req.file.filename,
      description: req.body.description,
      user_id: req.session.userId,
    });
    res.status(200).json(addImage);
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
});

module.exports = router;
