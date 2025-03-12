const submitRouter = require("express").Router();
const { postSubmitFile } = require("../controllers/submitController");

submitRouter.post("/:storageId", postSubmitFile);

module.exports = submitRouter;
