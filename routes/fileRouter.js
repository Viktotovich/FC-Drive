const fileRouter = require("express").Router();
const { getFile, postDeleteFile } = require("../controllers/fileController");

fileRouter.get("/:fileName/:fileId", getFile);

fileRouter.post("/:fileName/:fileId/delete", postDeleteFile);

module.exports = fileRouter;
