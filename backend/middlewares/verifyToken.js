const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");
const User = require("../models/user.schema");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized token not provided" });
  }

  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    req.user = user;
    next();
  });
};

const verifyForgetPasswordToken = (req, res, next) => {
  const token =
    req.cookies.forgetPasswordToken || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized token not provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
  verifyForgetPasswordToken,
};
