const AppPreferences = require('../../models/settings/AppPreferences.js');

exports.getAppPreferences = async (userId) => {
    console.log('Fetching app preferences for userId:', userId);
    const preferences = await AppPreferences.findOne({ userId });
    console.log('App preferences fetched:', preferences);
    return preferences;
};

exports.createAppPreferences = async (userId, preferencesData) => {
    console.log('Creating app preferences for userId:', userId);
    const preferences = new AppPreferences({ userId, ...preferencesData });
    await preferences.save();
    console.log('App preferences created:', preferences);
    return preferences;
};

exports.updateAppPreferences = async (userId, preferencesData) => {
    console.log('Updating app preferences for userId:', userId);
    console.log('New preferences data:', preferencesData);
    const updatedPreferences = await AppPreferences.findOneAndUpdate({ userId }, preferencesData, { new: true });
    console.log('App preferences updated:', updatedPreferences);
    return updatedPreferences;
};
