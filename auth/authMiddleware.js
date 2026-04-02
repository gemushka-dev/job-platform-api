require("dotenv").config();
const jwt = require("jsonwebtoken");
const HttpError = require("../error/httpError");

module.exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      throw new HttpError("Not Authenticated", 401);
    }
    try {
      const payload = jwt.verify(token, process.env.SECRET);
      req.user = payload;
      next();
    } catch (e) {
      throw new HttpError("Invalid Token", 401);
    }
  } catch (e) {
    next(e);
  }
};
