const folderRouter = require("express").Router();
const {
  postSubmitFile,
  getCreateFolder,
  postCreateFolder,
  getFolderPrivate,
  getCreateFile,
  postDeleteFolder,
  getRenameFolder,
  postRenameFolder,
} = require("../controllers/folderController");
3;
//GETS
folderRouter.get("/create", getCreateFolder);
folderRouter.get("/:folderId", getFolderPrivate);
folderRouter.get("/:folderId/create-file", getCreateFile);
folderRouter.get("/rename/:folderName/:folderId", getRenameFolder);

//POSTS
folderRouter.post("/create", postCreateFolder);
folderRouter.post("/:folderId/createFile", postSubmitFile);
folderRouter.post("/delete/:folderId", postDeleteFolder);
folderRouter.post("/rename/:folderName/:folderId", postRenameFolder);

module.exports = folderRouter;
