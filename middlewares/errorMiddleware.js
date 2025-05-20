const {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_BAD_REQUEST,
} = require("../constants/httpStatusConstant");
const ArgMismatchExc = require("../utils/error/argMismatchExc");
const CustomError = require("../utils/error/customError");

const error = (err, _req, res, _next) => {
  if (err instanceof CustomError) {
    console.log("error");
    res.status(err.statusCode);
  } else if (err instanceof ArgMismatchExc) {
    return res
      .status(HTTP_STATUS_BAD_REQUEST)
      .json({ message: err.message, isSuccess: false, details: err.details });
  } else {
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR);
  }
  res.json({ message: err.message, isSuccess: false });
};

module.exports = error;
