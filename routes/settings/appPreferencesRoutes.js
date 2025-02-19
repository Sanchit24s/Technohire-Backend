const express = require('express');
const router = express.Router();
const appPreferencesController = require('../../controllers/settings/appPreferencesController.js');
const { protect } = require('../../middlewares/EmployerAuthMiddleware.js');

router.get('/', protect, appPreferencesController.getAppPreferences);
router.post('/', protect, appPreferencesController.createAppPreferences);
router.put('/', protect, appPreferencesController.updateAppPreferences);

module.exports = router;
