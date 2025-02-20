const express = require('express');
const router = express.Router();
const helpSupportController = require('../../controllers/employer/helpSupportController');

router.get('/faq', helpSupportController.getFAQs);
router.post('/faq', helpSupportController.createFAQ);
router.put('/faq/:id', helpSupportController.updateFAQ);
router.get('/contact', helpSupportController.getContactMethods);
router.post('/contact', helpSupportController.createContactMethod);
router.put('/contact/:id', helpSupportController.updateContactMethod);

module.exports = router;
