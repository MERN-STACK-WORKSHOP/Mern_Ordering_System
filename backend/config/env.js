const dotenv = require("dotenv");

dotenv.config();

const mongoUri = process.env.MONGO_URI;

module.exports = {
  mongoUri,
};
