const express = require('express');
const router = express.Router();
const notificationSettingsController = require('../../controllers/settings/notificationSettingsController.js');
const { protect } = require('../../middlewares/EmployerAuthMiddleware.js');

router.get('/', protect, notificationSettingsController.getNotificationSettings);
router.post('/', protect, notificationSettingsController.createNotificationSettings);
router.put('/', protect, notificationSettingsController.updateNotificationSettings);

module.exports = router;
