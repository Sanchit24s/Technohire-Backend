const express = require('express');
const router = express.Router();
const userSettingsController = require('../../controllers/settings/userSettingsController.js');
const { protect } = require('../../middlewares/authMiddleware.js');

router.get('/', protect, userSettingsController.getUserSettings);
router.post('/', protect, userSettingsController.createUserSettings);
router.put('/', protect, userSettingsController.updateUserSettings);

module.exports = router;
