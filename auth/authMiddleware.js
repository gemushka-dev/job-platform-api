require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.auth = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).send("Not Authenticated");
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    req.user = payload;
    next();
  } catch (e) {
    res.status(401).send("Invalid Token");
  }
};
