const express = require('express');
const router = express.Router();
const termsConditionsController = require('../../controllers/employer/termsConditionsController');

router.get('/', termsConditionsController.getTermsConditions);
router.post('/', termsConditionsController.createTermsCondition);
router.put('/:id', termsConditionsController.updateTermsCondition);

module.exports = router;
