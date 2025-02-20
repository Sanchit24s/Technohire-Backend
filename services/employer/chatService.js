const Chat = require('../../models/employer/Chat');
const Message = require('../../models/employer/Message');

exports.createChat = async (participants) => {
    const chat = new Chat({ participants });
    await chat.save();
    return chat;
};

exports.getChats = async (employerId) => {
    return await Chat.find({ participants: employerId }).populate('participants', 'companyName email');
};

exports.createMessage = async (chatId, sender, text) => {
    const message = new Message({ chatId, sender, text });
    await message.save();
    await Chat.findByIdAndUpdate(chatId, { updatedAt: Date.now() });
    return message;
};

exports.getMessages = async (chatId) => {
    return await Message.find({ chatId }).populate('sender', 'companyName email');
};
