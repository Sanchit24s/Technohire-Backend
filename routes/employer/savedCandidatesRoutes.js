const express = require('express');
const router = express.Router();
const savedCandidatesController = require('../../controllers/employer/savedCandidatesController.js');
const { protect } = require('../../middlewares/EmployerAuthMiddleware');

router.get('/', protect, savedCandidatesController.getSavedCandidates);
router.post('/', protect, savedCandidatesController.saveCandidate);
router.put('/:id', protect, savedCandidatesController.updateSavedCandidate);
router.delete('/:id', protect, savedCandidatesController.deleteSavedCandidate);

module.exports = router;
