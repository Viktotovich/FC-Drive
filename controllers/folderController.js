const passport = require("passport");
const db = require("../db");
const links = require("../links");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

module.exports.postSubmitFile = [upload.single("file"), processSubmitFile];

module.exports.getCreateFolder = (req, res) => {
  if (req.isAuthenticated()) {
    const title = "Create a new folder, " + req.user.fullname;
    res.render("pages/create-folder", { title, links });
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
};

function processSubmitFile(req, res) {
  if (req.isAuthenticated()) {
    console.log(req.file, req.body);
    //TODO: Store the file somewhere and save the link or whatever
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
}
