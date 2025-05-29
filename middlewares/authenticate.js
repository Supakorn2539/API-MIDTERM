const CustomError = require("../utils/error/customError");
const { HTTP_STATUS_UNAUTHORIZED } = require("../constants/httpStatusConstant");
const { verifyJwt } = require("../utils/jwt");
const authenticate = (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(req.headers.authorization);
    if (!token || !token.startsWith("Bearer ")) {
      throw new CustomError("jwt malformed", HTTP_STATUS_UNAUTHORIZED);
    }

    const decode = verifyJwt(token.split(" ")[1]);
    req.userId = decode.id;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      next(new CustomError("Token expired", HTTP_STATUS_UNAUTHORIZED));
    } else {
      next(new CustomError("Invalid token", HTTP_STATUS_UNAUTHORIZED));
    }
  }
};

module.exports = authenticate;
