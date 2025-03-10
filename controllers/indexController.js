const links = require("../links");
const passport = require("passport");
const passwordUtils = require("../lib/passportUtils");
const { db } = require("../db");
const { validationResult } = require("express-validator");

module.exports.getIndex = (req, res) => {
  const title =
    "Welcome to FC-Drive, it's the place for all your files. You can keep things private, or generate a custom link to share with everyone else. ";
  res.render("pages/index", { title, links });
};
