const express = require("express");
require("dotenv").config();
const path = require("node:path");
const passport = require("passport");
require("./config/passport");

//sessions
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

//Routes
const indexRouter = require("./routes/indexRouter");
const submitRouter = require("./routes/submitRouter");

const app = express();

const assetsPath = path.join(__dirname, "public");

app.use(express.json());
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  expressSession({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

app.use(passport.session());

app.use("/", indexRouter);
app.use("/submit", submitRouter);

app.listen(process.env.PORT, () => {
  console.log("Hey Ya");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Houston, we've got a problem: " + err);
});
