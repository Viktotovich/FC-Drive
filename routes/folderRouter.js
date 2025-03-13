const folderRouter = require("express").Router();
const {
  postSubmitFile,
  getCreateFolder,
  postCreateFolder,
} = require("../controllers/folderController");

//GETS
folderRouter.get("/create", getCreateFolder);

//POSTS
folderRouter.post("/create", postCreateFolder);
folderRouter.post("/submit/:folderId", postSubmitFile);

module.exports = folderRouter;
