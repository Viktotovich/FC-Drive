const shareRouter = require("express").Router();
const {
  postShareFile,
  getPublicFile,
} = require("../controllers/shareController");

shareRouter.get("/:fileId", getPublicFile);

shareRouter.post("/create/:fileId", postShareFile);

module.exports = shareRouter;
