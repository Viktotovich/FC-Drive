const indexRouter = require("express").Router();
const {
  getIndex,
  getLogin,
  getRegister,
} = require("../controllers/indexController");

indexRouter.get("/", getIndex);
indexRouter.get("/login", getLogin);
indexRouter.get("/register", getRegister);

module.exports = indexRouter;
