const UserSettings = require('../../models/settings/UserSettings.js');

exports.getSettings = async (userId) => {
    console.log('Fetching settings for userId:', userId);
    const settings = await UserSettings.findOne({ userId });
    console.log('Settings fetched:', settings);
    return settings;
};

exports.createSettings = async (userId, settingsData) => {
    console.log('Creating settings for userId:', userId);
    const settings = new UserSettings({ userId, ...settingsData });
    await settings.save();
    console.log('Settings created:', settings);
    return settings;
};

exports.updateSettings = async (userId, settingsData) => {
    console.log('Updating settings for userId:', userId);
    console.log('New settings data:', settingsData);
    const updatedSettings = await UserSettings.findOneAndUpdate({ userId }, settingsData, { new: true });
    console.log('Settings updated:', updatedSettings);
    return updatedSettings;
};
