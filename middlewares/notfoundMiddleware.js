const { HTTP_STATUS_NOT_FOUND } = require("../constants/httpStatusConstant");

const notfound = (req, res) => {
  res
    .status(HTTP_STATUS_NOT_FOUND)
    .json({ message: "path not found", isSuccess: false, path: req.url });
};

module.exports = notfound;
