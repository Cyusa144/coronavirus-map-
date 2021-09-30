import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file.path, {
      folder: 'mapDashboard',
      use_filename: true,
    });
    return uploadResponse;
  } catch (err) {
    console.error(err);
    return '';
  }
};

const removeFileCloudinary = async (cloudinaryID) => {
  try {
    await cloudinary.uploader.destroy(cloudinaryID);
    console.log('File removed successfully');
  } catch (err) {
    console.error(err);
    console.log('Failed to remove file');
  }
};

export { uploadToCloudinary, removeFileCloudinary };
