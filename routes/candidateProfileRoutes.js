const express = require('express');
const router = express.Router();
const candidateProfileController = require('../controllers/CandidateProfileController.js');
const {protect} = require('../middlewares/authMiddleware.js'); // Middleware for user auth


router.post('/profile', protect, candidateProfileController.createCandidateProfile);

router.put('/profile/:id', protect, candidateProfileController.updateCandidateProfile)

router.get('/profile/:id', protect, candidateProfileController.getCandidateProfile)

module.exports = router