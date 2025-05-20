const { HTTP_STATUS_BAD_REQUEST } = require("../constants/httpStatusConstant");
const ArgMismatchExc = require("./error/argMismatchExc");

const validateSchema = (schema) => {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new ArgMismatchExc("validation error", HTTP_STATUS_BAD_REQUEST, result.error.issues);
    }
    req.body = result.data;
    next();
  };
};

module.exports = validateSchema;
