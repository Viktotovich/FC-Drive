const crypto = require("crypto");

module.exports.genPassport = function (password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 150000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
};

module.exports.validatePassword = function (password, hash, salt) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 150000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
};
