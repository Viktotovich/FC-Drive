const links = require("../links");
const passport = require("passport");
const passwordUtils = require("../lib/passwordUtils");
const db = require("../db");
const { validationResult } = require("express-validator");

module.exports.getIndex = (req, res) => {
  const title =
    "Welcome to FC-Drive, it's the place for all your files. You can keep things private, or generate a custom link to share with everyone else. ";
  const location = "/";
  res.render("pages/index", { title, links, location });
};

module.exports.getLogin = (req, res) => {
  const title = "Login into your account";
  const location = "/login";
  res.render("pages/login", { title, links, location });
};

module.exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("pages/login", {
      title: "Login failed",
      errors: errors.array(),
    });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("pages/login", {
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
  const location = "/register";
  res.render("pages/register", { title, links, location });
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

  try {
    await db.$transaction(async (prisma) => {
      await prisma.user.create({
        data: {
          username,
          fullname,
          salt,
          hash,
          Storage: {
            create: {},
          },
        },
      });
    });

    res.redirect("/login");
  } catch (err) {
    console.error("Failed to create the user or storage: " + err);
    throw err;
  }
};

module.exports.getMain = async (req, res) => {
  if (req.isAuthenticated()) {
    const title = "Welcome to the main page, " + req.user.fullname;
    const location = "/main";
    const folders = await db.folder.findMany({
      where: {
        userId: req.user.id,
      },
    });
    console.dir(folders, null);
    console.log("indexController, line 102");
    res.render("pages/main", { title, links, location, folders });
  } else {
    res.send(
      "<p>You can't view this page as you are not authorized, log-in to your account first please.</p>",
    );
  }
};

module.exports.getLogOut = (req, res) => {
  const title = "Are you sure you want to logout?";
  const location = "/logout";
  res.render("pages/logout", { title, links, location });
};

module.exports.postLogOut = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
};
