const fileRouter = require("express").Router();
const { getFile } = require("../controllers/fileController");

//TODO - continue in fileController
fileRouter.get("/:fileName/:fileId", getFile);

module.exports = fileRouter;
