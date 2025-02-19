const userSettingsService = require('../../services/settings/userSettingsService.js');

exports.getUserSettings = async (req, res) => {
    try {
        console.log('Get User Settings - req.user:', req.user);
        const settings = await userSettingsService.getSettings(req.user._id);
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUserSettings = async (req, res) => {
    try {
        console.log('Create User Settings - req.user:', req.user);
        console.log('Create User Settings - req.body:', req.body);
        const settings = await userSettingsService.createSettings(req.user._id, req.body);
        res.status(201).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserSettings = async (req, res) => {
    try {
        console.log('Update User Settings - req.user:', req.user);
        console.log('Update User Settings - req.body:', req.body);
        const updatedSettings = await userSettingsService.updateSettings(req.user._id, req.body);
        res.status(200).json(updatedSettings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
