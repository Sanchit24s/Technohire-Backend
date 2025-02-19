const notificationSettingsService = require('../../services/settings/notificationSettingsService');

exports.getNotificationSettings = async (req, res) => {
    try {
        const notificationSettings = await notificationSettingsService.getNotificationSettings(req.user._id);
        res.status(200).json(notificationSettings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNotificationSettings = async (req, res) => {
    try {
        const notificationSettings = await notificationSettingsService.createNotificationSettings(req.user._id, req.body);
        res.status(201).json(notificationSettings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateNotificationSettings = async (req, res) => {
    try {
        const updatedNotificationSettings = await notificationSettingsService.updateNotificationSettings(req.user._id, req.body);
        res.status(200).json(updatedNotificationSettings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
