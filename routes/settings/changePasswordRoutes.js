const express = require('express');
const router = express.Router();
const changePasswordController = require('../../controllers/settings/changePasswordController.js');
const { protect } = require('../../middlewares/EmployerAuthMiddleware.js');

router.post('/', protect, changePasswordController.changePassword);

module.exports = router;
