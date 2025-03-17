const db = require("../db");
const links = require("../links");
const multer = require("multer");
const cloud = require("../cloudinary/cloudinary");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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

module.exports.postDeleteFolder = async (req, res) => {
  if (req.isAuthenticated()) {
    const { folderId } = req.params;
    await db.folder.delete({
      where: {
        id: folderId,
      },
    });

    res.redirect("/main");
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
};

module.exports.getRenameFolder = async (req, res) => {
  const { folderId, folderName } = req.params;
  const title = "Rename folder: " + folderName;
  const location = "/rename";
  res.render("pages/rename-folder", {
    title,
    location,
    links,
    folderId,
    folderName,
  });
};

module.exports.postRenameFolder = async (req, res) => {
  if (req.isAuthenticated()) {
    const { folderId } = req.params;
    const { folderName } = req.body;

    await db.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name: folderName,
      },
    });

    res.redirect("/main");
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
};

//postSubmitFile, made this way as we need Multer middleware
async function processSubmitFile(req, res) {
  if (req.isAuthenticated()) {
    const { originalname, encoding, mimetype, path, size } = req.file;
    const { folderId } = req.params;

    const { url, public_id } = await cloud.uploadAsset(path);

    await db.file.create({
      data: {
        name: originalname || folderId,
        folderId: folderId,
        size: size,
        path: url,
        publicId: public_id,
        encoding: encoding,
        mimetype: mimetype,
      },
    });
    res.redirect("/folder/" + folderId);
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
}
