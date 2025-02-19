const appPreferencesService = require('../../services/settings/appPreferencesService.js');

exports.getAppPreferences = async (req, res) => {
    try {
        const appPreferences = await appPreferencesService.getAppPreferences(req.user._id);
        res.status(200).json(appPreferences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAppPreferences = async (req, res) => {
    try {
        const appPreferences = await appPreferencesService.createAppPreferences(req.user._id, req.body);
        res.status(201).json(appPreferences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAppPreferences = async (req, res) => {
    try {
        const updatedAppPreferences = await appPreferencesService.updateAppPreferences(req.user._id, req.body);
        res.status(200).json(updatedAppPreferences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
