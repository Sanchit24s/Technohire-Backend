const NotificationSettings = require('../../models/settings/NotificationSettings.js');

exports.getNotificationSettings = async (userId) => {
    console.log('Fetching notification settings for userId:', userId);
    const settings = await NotificationSettings.findOne({ userId });
    console.log('Notification settings fetched:', settings);
    return settings;
};

exports.createNotificationSettings = async (userId, settingsData) => {
    console.log('Creating notification settings for userId:', userId);
    const settings = new NotificationSettings({ userId, ...settingsData });
    await settings.save();
    console.log('Notification settings created:', settings);
    return settings;
};

exports.updateNotificationSettings = async (userId, settingsData) => {
    console.log('Updating notification settings for userId:', userId);
    console.log('New settings data:', settingsData);
    const updatedSettings = await NotificationSettings.findOneAndUpdate({ userId }, settingsData, { new: true });
    console.log('Notification settings updated:', updatedSettings);
    return updatedSettings;
};
