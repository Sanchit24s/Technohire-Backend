const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "company_assets", // Folder in Cloudinary
        allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"], // Allowed file formats
        public_id: (req, file) => `company-${Date.now()}-${file.originalname}`, // Unique file name
    },
});

// Initialize Multer with Cloudinary Storage
const upload = multer({ storage });

module.exports = upload;
