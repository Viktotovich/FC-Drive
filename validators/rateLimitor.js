const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message:
    "Too many failed login attempts. I am really sorry, but you are going to have to try again in 5 minutes. (This keeps you safe from hackers)",
});

module.exports = loginLimiter;
