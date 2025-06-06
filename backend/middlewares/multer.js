const multer = require("multer");

const storage = multer.memoryStorage();

/**
 * @description multer middleware for file upload
 * @param {Object} req - request object
 * @param {Object} file - file object
 */
const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

module.exports = upload;
