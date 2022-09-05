require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dcri9a1wy",
  api_key: "535929633892334",
  api_secret: "Whyk2ca0yLBuug9jE3ECnWVzp9s",
});

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_APIKEY,
//   api_secret: process.env.CLOUDINARY_APISECRET,
// });

module.exports = cloudinary;
