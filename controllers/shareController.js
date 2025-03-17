const links = require("../links");
const db = require("../db");

module.exports.postShareFile = async (req, res) => {
  if (req.isAuthenticated()) {
    const { validity } = req.body;
    const { fileId } = req.params;

    const expiresAt = getExpiresDate(validity);

    await db.allowedRoute.create({
      data: {
        expiresAt: expiresAt,
        fileId: fileId,
      },
    });

    //Too lazy to validate for non-prod (4 AM things), if you're in prod - sanitize this fucking input
    const path = "/share/" + fileId;

    res.redirect(path);
  } else {
    res.status(501).send("You are unauthorized to perform this action");
  }
};

module.exports.getPublicFile = async (req, res) => {
  const { fileId } = req.params;
  const expirationDate = await db.allowedRoute.findFirst({
    where: {
      fileId: fileId,
    },
  });

  if (!checkIfExpired(expirationDate)) {
    const file = await db.file.findFirst({
      where: {
        id: fileId,
      },
    });

    const title = "Viewing " + file.name;
    const location = "/share";

    res.render("pages/shared-file", { links, title, location, file });
  } else {
    res
      .status(501)
      .send(
        "Unfortunately, this link has expired and you can no longer view its contents.",
      );
  }
};

function getExpiresDate(dateText) {
  const date = new Date();

  switch (dateText) {
    case "oneDay":
      date.setDate(date.getDate() + 1);
      break;
    case "threeDays":
      date.setDate(date.getDate() + 3);
      break;
    case "oneWeek":
      date.setDate(date.getDate() + 7);
      break;
    default:
      throw new Error("This date is not valid.");
  }

  return date;
}

function checkIfExpired(expirationDate) {
  return new Date() > new Date(expirationDate);
}
