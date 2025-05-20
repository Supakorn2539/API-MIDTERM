class ArgMismatchExc extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.name = "ArgMismatchExc";
    this.statusCode = statusCode;
    this.details = details;
  }
}

module.exports = ArgMismatchExc;
