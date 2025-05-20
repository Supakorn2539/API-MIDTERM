const { hash, compare } = require("bcryptjs");

exports.hash = async (password) => {
  return await hash(password, 10);
};

exports.comparePassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};
