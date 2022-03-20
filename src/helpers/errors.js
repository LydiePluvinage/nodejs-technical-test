class ErrorHandler extends Error {
  statusCode;
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// displays status and error message when an error is thrown.
// If no status message is provided, set 500 by default
const handleError = (err, _req, res, _next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    status: 'error',
    statusCode,
  });
  // for DEV purposes, console.log or store error in a file or sends an email to developers
  console.log(message);
};

module.exports = { ErrorHandler, handleError };
