const chatService = require('../../services/employer/chatService');

exports.createChat = async (req, res) => {
    try {
        const chat = await chatService.createChat(req.body.participants);
        res.status(201).json(chat);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getChats = async (req, res) => {
    try {
        const chats = await chatService.getChats(req.user._id);
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createMessage = async (req, res) => {
    try {
        const message = await chatService.createMessage(req.params.chatId, req.user._id, req.body.text);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await chatService.getMessages(req.params.chatId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
