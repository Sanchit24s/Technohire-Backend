const express = require("express");
const { createEmployerProfile, updateEmployerProfile, getEmployerProfile, deleteEmployerProfile } = require("../controllers/employerController.js");
const { protect } = require('../middleware/EmployerAuthMiddleware.js');
const multer = require('multer');

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post("/", protect, upload.fields([{ name: 'coverImage' }, { name: 'logo' }]), createEmployerProfile);
router.put("/:id", protect, upload.fields([{ name: 'coverImage' }, { name: 'logo' }]), updateEmployerProfile);
router.get("/:id", protect, getEmployerProfile);
router.delete("/:id", protect, deleteEmployerProfile);


module.exports = router;
