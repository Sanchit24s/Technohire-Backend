const express = require('express');
const router = express.Router();
const signInSecurityController = require('../../controllers/settings/signInSecurityController.js');
const { protect } = require('../../middlewares/EmployerAuthMiddleware.js');

router.get('/', protect, signInSecurityController.getSignInSecurity);
router.post('/', protect, signInSecurityController.createSignInSecurity);
router.put('/', protect, signInSecurityController.updateSignInSecurity);

module.exports = router;
