const express = require("express");

const router = express.Router();

const {
  register,
  verifyRegisterOtp,
} = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", register);
router.post("/verify-otp", verifyToken, verifyRegisterOtp);

module.exports = router;
