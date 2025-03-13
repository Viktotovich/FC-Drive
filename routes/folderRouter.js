const folderRouter = require("express").Router();
const {
  postSubmitFile,
  getCreateFolder,
} = require("../controllers/folderController");

//GETS
folderRouter.get("/create", getCreateFolder);

//POSTS
folderRouter.post("/submit/:folderId", postSubmitFile);

module.exports = folderRouter;
