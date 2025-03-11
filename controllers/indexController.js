const links = require("../links");
const passport = require("passport");
const passwordUtils = require("../lib/passwordUtils");
const db = require("../db");
const { validationResult } = require("express-validator");

module.exports.getIndex = (req, res) => {
  const title =
    "Welcome to FC-Drive, it's the place for all your files. You can keep things private, or generate a custom link to share with everyone else. ";
  res.render("pages/index", { title, links });
};

module.exports.getLogin = (req, res) => {
  const title = "Login into your account";
  res.render("pages/login", { title, links });
};

module.exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("/login", {
        title: "Login fail",
        errors: ["Wrong username or password."],
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.redirect("/main");
    });
  })(req, res, next);
};

module.exports.getRegister = (req, res) => {
  const title = "Register for V-Drive";
  res.render("pages/register", { title, links });
};

module.exports.postRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("pages/register", {
      title: "Registration failed",
      errors: errors.array(),
    });
  }

  const { firstName, lastName, username } = req.body;
  const fullname = firstName + " " + lastName;
  const { salt, hash } = passwordUtils.genPassport(req.body.password);

  await db.user.create({
    data: {
      username,
      fullname,
      salt,
      hash,
    },
  });

  res.redirect("/login");
};

module.exports.getMain = (req, res) => {
  //throw if not authenticated
  const title = "Welcome to the main page, " + req.user.fullname;
  res.render("pages/main", { title, links });
};
