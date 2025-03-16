const shareRouter = require("express").Router();
const { postShareFile } = require("../controllers/shareController");

shareRouter.post("/share/create/:fileId", postShareFile);

module.exports = shareRouter;
