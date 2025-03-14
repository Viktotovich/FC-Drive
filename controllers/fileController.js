const links = require("../links");
const db = require("../db");

module.exports.getFile = async (req, res) => {
  const { fileId, fileName } = req.params;
  const title = "Viewing " + fileName;
  const location = "/file";
  const file = await db.file.findFirst({
    where: {
      id: fileId,
      name: fileName,
    },
  });

  console.dir(file, null);
  res.render("pages/file", { links, title, location, file });
};
