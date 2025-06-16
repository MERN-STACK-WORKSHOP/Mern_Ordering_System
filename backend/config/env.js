const dotenv = require("dotenv");

dotenv.config();

const mongoUri = process.env.MONGO_URI;
const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;
const mailHost = process.env.MAIL_HOST;
const mailPort = process.env.MAIL_PORT;
const mailSecure = process.env.MAIL_SECURE;
const jwtSecret = process.env.JWT_SECRET;
const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const nodeEnv = process.env.NODE_ENV;
const merchantUid = process.env.MERCHANT_U_ID;
const merchantApiUserId = process.env.MERCHANT_API_USER_ID;
const merchantApiKey = process.env.MERCHANT_API_KEY;

module.exports = {
  mongoUri,
  mailUser,
  mailPass,
  mailHost,
  mailPort,
  mailSecure,
  jwtSecret,
  cloudName,
  apiKey,
  apiSecret,
  nodeEnv,
  merchantUid,
  merchantApiUserId,
  merchantApiKey,
};
