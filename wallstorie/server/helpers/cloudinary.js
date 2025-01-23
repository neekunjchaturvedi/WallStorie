const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dc8vfdhz7",
  api_key: "756922894465624",
  api_secret: "RAMKquYyFRIxDNNB_PtxBq8tun8",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  try {
    // Simplified upload options without metadata
    const uploadOptions = {
      resource_type: "auto",
      folder: "product-images",
      public_id: `${Date.now()}`, // Unique identifier for each upload
    };

    const result = await cloudinary.uploader.upload(file, uploadOptions);

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

module.exports = { upload, imageUploadUtil };
