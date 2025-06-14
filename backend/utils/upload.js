const cloudinary = require("../config/cloudinary");

/**
 * @description This function uploads an image file to cloudinary cloud
 * @param Object - detailed bellow
 * @param String mimetype
 * @param String originalname
 * @param Buffer buffer
 */
const uploadImageFile = async ({ mimetype, buffer, originalname }) => {
  try {
    const ext = mimetype.split("/")[1];
    const fileEncoded = `data:image/${ext};base64,${buffer.toString("base64")}`;
    const response = await cloudinary.uploader.upload(fileEncoded, {
      format: ext,
      public_id: originalname.split(".")[0],
      resource_type: "image",
      encoding: "base64",
    });
    return {
      url: response.url,
      secureUrl: response.secure_url,
      publicId: response.public_id,
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = uploadImageFile;
