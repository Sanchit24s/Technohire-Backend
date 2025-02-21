const express = require('express');
const router = express.Router();
const chatController = require('../../controllers/employer/chatController');
const { protect } = require('../../middlewares/EmployerAuthMiddleware');

router.post('/chats', protect, chatController.createChat);
router.get('/chats', protect, chatController.getChats);
router.post('/chats/:chatId/messages', protect, chatController.createMessage);
router.get('/chats/:chatId/messages', protect, chatController.getMessages);

module.exports = router;
