const { v2: cloudinary } = require("cloudinary");
const { cloudName, apiKey, apiSecret } = require("./env");

/**
 * @description cloudinary configuration
 * @param {Object} cloudinary - cloudinary object
 */
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

module.exports = cloudinary;
