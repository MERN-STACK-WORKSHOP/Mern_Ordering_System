const dotenv = require("dotenv");

dotenv.config();

const mongoUri = process.env.MONGO_URI;
const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;
const mailHost = process.env.MAIL_HOST;
const mailPort = process.env.MAIL_PORT;
const mailSecure = process.env.MAIL_SECURE;
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  mongoUri,
  mailUser,
  mailPass,
  mailHost,
  mailPort,
  mailSecure,
  jwtSecret,
};
