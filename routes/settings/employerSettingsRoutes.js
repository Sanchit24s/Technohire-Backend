const express = require('express');
const router = express.Router();
const employerSettingsController = require('../../controllers/settings/employerSettingsController');
const { protect } = require('../../middlewares/EmployerAuthMiddleware');

router.get('/:id', protect, employerSettingsController.getEmployerSettings);
router.post('/', protect, employerSettingsController.createEmployerSettings);
router.put('/:id', protect, employerSettingsController.updateEmployerSettings);
router.put('/change-password', protect, employerSettingsController.changePassword);

module.exports = router;
