


import cloudinary from "../../config/cloudinary.js";
import ApiError from "../../utils/apiError.js";

export const uploadToCloudinary = async (tempFilePath) => {
  try {
    const { secure_url } = await cloudinary.v2.uploader.upload(tempFilePath, {
      use_filename: true,
      folder: "Meech Ticketing",
    });
    return secure_url;
  } catch (error) {
    throw new ApiError(500, "Error uploading to Cloudinary: " + error.message);  
  }
};
