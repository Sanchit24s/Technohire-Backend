const EmployerSettings = require('../../models/settings/EmployerSettings.js');

exports.getSettings = async (userId) => {
    console.log('Fetching settings for userId:', userId);
    const settings = await EmployerSettings.findOne({ userId });
    console.log('Settings fetched:', settings);
    return settings;
};

exports.createSettings = async (userId, settingsData) => {
    console.log('Creating settings for userId:', userId);
    const settings = new EmployerSettings({ userId, ...settingsData });
    await settings.save();
    console.log('Settings created:', settings);
    return settings;
};

exports.updateSettings = async (userId, settingsData) => {
    console.log('Updating settings for userId:', userId);
    console.log('New settings data:', settingsData);
    const updatedSettings = await EmployerSettings.findOneAndUpdate({ userId }, settingsData, { new: true });
    console.log('Settings updated:', updatedSettings);
    return updatedSettings;
};
