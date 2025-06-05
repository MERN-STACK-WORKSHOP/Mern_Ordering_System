const User = require("../models/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateOtp = require("../utils/generateOtp");
const { transporter } = require("../config/mailer");
const { jwtSecret } = require("../config/env");
const htmlOtpMessage = require("../utils/emailMessage");

const setCookie = (res, name = "token", token) => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 10 * 60 * 1000,
  });
};

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

    setCookie(res, "token", token);

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
    res.clearCookie("token");
    return res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      const otp = generateOtp();
      await transporter.sendMail({
        from: "Ordering System <no-reply@orderingapp.com>",
        to: user.email,
        subject: "Verification OTP",
        html: htmlOtpMessage(user.name, otp),
      });
      user.otp = otp;
      user.otpExpiresIn = Date.now() + 10 * 60 * 1000;
      await user.save();
      return res
        .status(400)
        .json({ message: "User not verified, check your email for OTP" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    setCookie(res, "token", token);

    return res
      .status(200)
      .json({ message: "User logged in successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOtp();
    await transporter.sendMail({
      from: "Ordering System <no-reply@orderingapp.com>",
      to: user.email,
      subject: "Password Reset OTP",
      html: htmlOtpMessage(user.name, otp),
    });

    user.otp = otp;
    user.otpExpiresIn = Date.now() + 10 * 60 * 1000;
    await user.save();

    const token = jwt.sign({ email }, jwtSecret, {
      expiresIn: "10m",
    });

    setCookie(res, "forgetPasswordToken", token);

    return res
      .status(200)
      .json({ message: "Password reset OTP sent successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  verifyRegisterOtp,
  loginUser,
  logoutUser,
  forgetPassword,
};
