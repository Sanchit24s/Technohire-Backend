const employerSettingsService = require('../../services/settings/employerSettingsService.js');

exports.getEmployerSettings = async (req, res) => {
    try {
        console.log('Get Employer Settings - req.user:', req.user);
        const settings = await employerSettingsService.getSettings(req.user._id);
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEmployerSettings = async (req, res) => {
    try {
        console.log('Create Employer Settings - req.user:', req.user);
        console.log('Create Employer Settings - req.body:', req.body);
        const settings = await employerSettingsService.createSettings(req.user._id, req.body);
        res.status(201).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEmployerSettings = async (req, res) => {
    try {
        console.log('Update Employer Settings - req.user:', req.user);
        console.log('Update Employer Settings - req.body:', req.body);
        const updatedSettings = await employerSettingsService.updateSettings(req.user._id, req.body);
        res.status(200).json(updatedSettings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
