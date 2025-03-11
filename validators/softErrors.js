const softErrors = {
  alpha: function (errorCause) {
    return errorCause + " must contain only letters.";
  },
  length: function (errorCause, min, max) {
    return (
      errorCause + " must be between " + min + " and " + max + " characters."
    );
  },
  format: function (errorCause, validFormat) {
    return errorCause + " must be in a valid format, i.e: " + validFormat;
  },
  taken: function () {
    return "This username is already taken.";
  },
  noMatch: function () {
    return "The passwords do not match.";
  },
  incorrect: function () {
    return "The username or password is incorrect.";
  },
};

module.exports = softErrors;
