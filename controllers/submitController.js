const passport = require("passport");
const db = require("../db");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

module.exports.postSubmitFile = [upload.single("file"), processSubmitFile];

function processSubmitFile(req, res) {
  if (req.isAuthenticated()) {
    console.log(req.file, req.body);
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
}
