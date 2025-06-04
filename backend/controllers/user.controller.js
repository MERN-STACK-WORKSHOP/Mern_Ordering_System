const User = require("../models/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateOtp = require("../utils/generateOtp");
const { transporter } = require("../config/mailer");
const { jwtSecret } = require("../config/env");
const htmlOtpMessage = require("../utils/emailMessage");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    const mailOptions = {
      from: "Ordering System <no-reply@orderingapp.com>",
      to: email,
      subject: "Verification OTP",
      html: htmlOtpMessage(name, otp),
    };

    await Promise.all([
      User.create({
        name,
        email,
        password: hashedPassword,
        otp,
      }),
      transporter.sendMail(mailOptions),
    ]);

    const token = jwt.sign({ email }, jwtSecret, {
      expiresIn: "10m",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 10 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyRegisterOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.user.email;

    const user = await User.findOne({
      $and: [{ email }, { isVerified: false }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.otpExpiresIn < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP or OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresIn = null;

    await user.save();

    return res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  verifyRegisterOtp,
};
