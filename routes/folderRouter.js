const folderRouter = require("express").Router();
const { postSubmitFile } = require("../controllers/folderController");

folderRouter.post("/submit/:folderId", postSubmitFile);

module.exports = folderRouter;
