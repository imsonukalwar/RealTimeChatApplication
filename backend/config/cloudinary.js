// const cloudinary=require('cloudinary')
// const fs=require('fs')
// const uploadCloudinary=async()=>{
//     cloudinary.config({
//         cloud_name:process.env.CLOUD_NAME,
//         api_key:process.env.API_KEY,
//         api_secret:process.env.API_SECRET
//     })
//     try {
//         const uploadresult=await cloudinary.uploader
//         .upload(filePath)
//         fs.unlinkSync(filePath)
//         return uploadresult.secure_url
//     } catch (error) {
//         fs.unlinkSync(filePath)
//         console.log(error);
        
//     }
// }

// module.exports=uploadCloudinary



const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "profile_images",
    });

    fs.unlinkSync(filePath); // delete local file

    return uploadResult.secure_url;

  } catch (error) {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.log("Cloudinary Upload Error:", error.message);
    throw error;
  }
};

module.exports = uploadCloudinary;
