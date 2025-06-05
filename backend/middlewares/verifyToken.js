const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log(req.headers);
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
