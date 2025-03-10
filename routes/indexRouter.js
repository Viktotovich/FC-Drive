const indexRouter = require("express").Router();
const { getIndex } = require("../controllers/indexController");

indexRouter.get("/", getIndex);

module.exports = indexRouter;
