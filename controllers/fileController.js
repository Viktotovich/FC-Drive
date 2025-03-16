const links = require("../links");
const db = require("../db");
const cloud = require("../cloudinary/cloudinary");

module.exports.getFile = async (req, res) => {
  if (req.isAuthenticated()) {
    const { fileId, fileName } = req.params;
    const title = "Viewing " + fileName;
    const location = "/file";
    const file = await db.file.findFirst({
      where: {
        id: fileId,
        name: fileName,
      },
    });

    res.render("pages/file", { links, title, location, file });
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
};

module.exports.postDeleteFile = async (req, res) => {
  if (req.isAuthenticated()) {
    const { fileId } = req.params;
    try {
      const { publicId } = await db.file.findFirst({
        where: {
          id: fileId,
        },
      });

      await cloud.destroyAsset(publicId);

      await db.file.delete({
        where: {
          id: fileId,
        },
      });

      res.redirect(`/main`);
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
};
