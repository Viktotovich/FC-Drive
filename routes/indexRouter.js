const indexRouter = require("express").Router();
const { validateSignUp, validateSignIn } = require("../validators/validators");
const loginLimiter = require("../validators/rateLimitor");
const {
  getIndex,
  getLogin,
  getRegister,
  getMain,
  postRegister,
  postLogin,
  postLogOut,
} = require("../controllers/indexController");

indexRouter.get("/", getIndex);
indexRouter.get("/login", getLogin);
indexRouter.get("/register", getRegister);
indexRouter.get("/main", getMain);

indexRouter.post("/register", postRegister);
indexRouter.post("/login", loginLimiter, validateSignIn, postLogin);
indexRouter.post("/logout", validateSignUp, postLogOut);

module.exports = indexRouter;
