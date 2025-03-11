const links = require("../links");
const passport = require("passport");
const passwordUtils = require("../lib/passwordUtils");
const { db } = require("../db");
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

module.exports.getRegister = (req, res) => {
  const title = "Register for V-Drive";
  res.render("pages/register", { title, links });
};
