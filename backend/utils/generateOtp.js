const otpGenerator = require("otp-generator");

const generateOtp = () =>
  otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

module.exports = generateOtp;
