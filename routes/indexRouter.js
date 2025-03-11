const indexRouter = require("express").Router();
const { getIndex, getLogin } = require("../controllers/indexController");

indexRouter.get("/", getIndex);
indexRouter.get("/login", getLogin);

module.exports = indexRouter;
