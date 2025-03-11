const indexRouter = require("express").Router();
const loginLimiter = require("../validators/rateLimitor");
const {
  getIndex,
  getLogin,
  getRegister,
  getMain,
  postRegister,
  postLogin,
} = require("../controllers/indexController");

indexRouter.get("/", getIndex);
indexRouter.get("/login", loginLimiter, getLogin);
indexRouter.get("/register", getRegister);
indexRouter.get("/main", getMain);

indexRouter.post("/register", postRegister);
indexRouter.post("/login", postLogin);

module.exports = indexRouter;
