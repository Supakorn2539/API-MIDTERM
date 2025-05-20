class CustomError extends Error {
  statusCode = 400;

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;
