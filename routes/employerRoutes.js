const express = require('express');
const { createEmployerProfile, updateEmployerProfile, getEmployerProfile, deleteEmployerProfile } = require('../controllers/employerController.js');
const { protect } = require('../middlewares/EmployerAuthMiddleware.js');
const upload = require('../middlewares/multer.js'); // Import the updated multer configuration

const router = express.Router();

// Create Employer Profile
router.post('/', protect, upload.fields([{ name: 'coverImage' }, { name: 'logo' }]), createEmployerProfile);

// Update Employer Profile
router.put('/:id', protect, upload.fields([{ name: 'coverImage' }, { name: 'logo' }]), updateEmployerProfile);

// Get Employer Profile
router.get('/:id', protect, getEmployerProfile);

// Delete Employer Profile
router.delete('/:id', protect, deleteEmployerProfile);

module.exports = router;