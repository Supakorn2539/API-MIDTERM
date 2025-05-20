const { sign, verify } = require("jsonwebtoken");
const { JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRES_IN } = require("../constants/jwtConstant");

exports.signJwt = (payload) => {
  return sign(payload, JWT_SECRET, { algorithm: JWT_ALGORITHM, expiresIn: JWT_EXPIRES_IN });
};

exports.verifyJwt = (token) => {
  return verify(token, JWT_SECRET);
};
