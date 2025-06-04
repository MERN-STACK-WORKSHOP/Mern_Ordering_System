const nodemailer = require("nodemailer");
const { mailUser, mailPass, mailSecure, mailPort, mailHost } = require("./env");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: mailHost,
  port: mailPort,
  secure: mailSecure,
  auth: {
    user: mailUser,
    pass: mailPass,
  },
});

module.exports = { transporter };
