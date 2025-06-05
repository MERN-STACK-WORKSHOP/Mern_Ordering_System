const express = require("express");

const router = express.Router();

const {
  register,
  verifyRegisterOtp,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", register);
router.post("/verify-otp", verifyToken, verifyRegisterOtp);
router.post("/login", loginUser);
router.post("/logout", verifyToken, logoutUser);

module.exports = router;
