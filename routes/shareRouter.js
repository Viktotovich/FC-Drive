const shareRouter = require("express").Router();
const { postShareFile } = require("../controllers/shareController");

shareRouter.post("/create/:fileId", postShareFile);

module.exports = shareRouter;
