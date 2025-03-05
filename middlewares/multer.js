const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import the fs module

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadsDir = path.join(__dirname, '../uploads'); // Ensure this path is correct
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true }); // Create the directory if it doesn't exist
        }
        cb(null, uploadsDir); // Save files in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Generate a unique filename
    },
});

const upload = multer({ storage });

module.exports = upload;
