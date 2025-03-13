const passport = require("passport");
const db = require("../db");
const links = require("../links");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

module.exports.postSubmitFile = [upload.single("file"), processSubmitFile];

module.exports.getCreateFolder = (req, res) => {
  if (req.isAuthenticated()) {
    const title = "Create a new folder, " + req.user.fullname;
    const location = "/folder";
    res.render("pages/create-folder", { title, links, location });
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
};

module.exports.postCreateFolder = async (req, res) => {
  if (req.isAuthenticated()) {
    const { folderName } = req.body;
    const userId = req.user.id;
    await db.folder.create({
      data: {
        name: folderName,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.redirect("/main");
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
};

//postSubmitFile, made this way as we need Multer middleware
function processSubmitFile(req, res) {
  if (req.isAuthenticated()) {
    console.log(req.file, req.body);
    //TODO: Store the file somewhere and save the link or whatever
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
}
