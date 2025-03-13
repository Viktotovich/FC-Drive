const passport = require("passport");
const db = require("../db");
const links = require("../links");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

module.exports.postSubmitFile = [upload.single("userFile"), processSubmitFile];

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

module.exports.getFolderPrivate = async (req, res) => {
  if (req.isAuthenticated()) {
    const { folderId } = req.params;
    const folderData = await db.folder.findFirst({
      where: {
        id: folderId,
      },
      include: {
        files: true,
      },
    });
    console.dir(folderData, null);
    const title = "Viewing folder: " + folderData.name;
    const location = "/folder";

    res.render("pages/folder", { title, links, location, folderData });
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
};

module.exports.getCreateFile = async (req, res) => {
  if (req.isAuthenticated()) {
    const title = "Uploading a new file";
    const location = "/file";
    const { folderId } = req.params;
    res.render("pages/upload-file", { title, links, location, folderId });
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
};

//postSubmitFile, made this way as we need Multer middleware
async function processSubmitFile(req, res) {
  if (req.isAuthenticated()) {
    const { originalname, encoding, mimetype, path, size } = req.file;
    const { folderId } = req.params;

    await db.file.create({
      data: {
        name: originalname || folderId,
        folderId: folderId,
        size: size,
        path: path,
        encoding: encoding,
        mimetype: mimetype,
      },
    });
    res.redirect("/folder/" + folderId);
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
}
