const folderRouter = require("express").Router();
const {
  postSubmitFile,
  getCreateFolder,
  postCreateFolder,
  getFolderPrivate,
  getCreateFile,
} = require("../controllers/folderController");

//GETS
folderRouter.get("/create", getCreateFolder);
folderRouter.get("/:folderId", getFolderPrivate);
folderRouter.get("/:folderId/create-file", getCreateFile);

//POSTS
folderRouter.post("/create", postCreateFolder);
folderRouter.post("/:folderId/createFile", postSubmitFile);

module.exports = folderRouter;
