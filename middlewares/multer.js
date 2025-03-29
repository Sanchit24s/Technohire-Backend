const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const allowedFormats = ["png", "jpg", "jpeg", "webp"];
        const fileExtension = file.mimetype.split("/")[1];

        if (!allowedFormats.includes(fileExtension)) {
            throw new Error("Invalid file type. Only images are allowed.");
        }

        return {
            folder: "Technohire/EmployerProfile",
            format: fileExtension,
            public_id: Date.now() + "-" + file.originalname,
        };
    },
});

const upload = multer({ storage });

module.exports = upload;
