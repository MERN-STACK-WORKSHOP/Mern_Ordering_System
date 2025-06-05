const express = require("express");

const router = express.Router();

const {
  register,
  verifyRegisterOtp,
  loginUser,
  logoutUser,
  forgetPassword,
  verifyForgetPasswordOtp,
  resetPassword,
} = require("../controllers/user.controller");
const {
  verifyToken,
  verifyForgetPasswordToken,
} = require("../middlewares/verifyToken");

router.post("/register", register);
router.post("/verify-otp", verifyToken, verifyRegisterOtp);
router.post("/login", loginUser);
router.post("/logout", verifyToken, logoutUser);
router.post("/forget-password", forgetPassword);
router.post(
  "/verify-forget-password-otp",
  verifyForgetPasswordToken,
  verifyForgetPasswordOtp
);
router.post("/reset-password", verifyForgetPasswordToken, resetPassword);

module.exports = router;
