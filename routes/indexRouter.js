const indexRouter = require("express").Router();
const loginLimiter = require("../validators/rateLimitor");
const {
  getIndex,
  getLogin,
  getRegister,
  getMain,
} = require("../controllers/indexController");

indexRouter.get("/", getIndex);
indexRouter.get("/login", loginLimiter, getLogin);
indexRouter.get("/register", getRegister);
indexRouter.get("/main", getMain);

indexRouter.post("/register");

module.exports = indexRouter;
