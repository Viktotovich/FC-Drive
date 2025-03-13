const submitRouter = require("express").Router();
const { postSubmitFile } = require("../controllers/folderController");

submitRouter.post("/submit/:folderId", postSubmitFile);

module.exports = submitRouter;
