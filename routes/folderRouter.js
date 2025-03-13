const folderRouter = require("express").Router();
const {
  postSubmitFile,
  getCreateFolder,
  postCreateFolder,
  getFolderPrivate,
} = require("../controllers/folderController");

//GETS
folderRouter.get("/create", getCreateFolder);
folderRouter.get("/:folderId", getFolderPrivate);

//POSTS
folderRouter.post("/create", postCreateFolder);
folderRouter.post("/submit/:folderId", postSubmitFile);

module.exports = folderRouter;
