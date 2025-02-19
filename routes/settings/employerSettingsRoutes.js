const express = require('express');
const router = express.Router();
const employerSettingsController = require('../../controllers/settings/employerSettingsController');
const { protect } = require('../../middlewares/EmployerAuthMiddleware');

router.get('/', protect, employerSettingsController.getEmployerSettings);
router.post('/', protect, employerSettingsController.createEmployerSettings);
router.put('/', protect, employerSettingsController.updateEmployerSettings);

module.exports = router;
