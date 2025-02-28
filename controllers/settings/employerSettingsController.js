const employerSettingsService = require('../../services/settings/employerSettingsService');

exports.getEmployerSettings = async (req, res) => {
    try {
        const settings = await employerSettingsService.getSettings(req.user.id);
        if (!settings) return res.status(404).json({ message: "Settings not found" });

        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.createEmployerSettings = async (req, res) => {
    try {
        const { settingsData } = req.body;
        const newSettings = await employerSettingsService.createSettings(req.user.id, settingsData);

        res.status(201).json({ message: "Settings created successfully", newSettings });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateEmployerSettings = async (req, res) => {
    try {
        const updatedSettings = await employerSettingsService.updateSettings(req.user.id, req.body);
        res.status(200).json({ message: "Settings updated successfully", updatedSettings });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ msg: "New password and confirm password do not match" });
        }

        const result = await employerSettingsService.changePassword(req.user.id, currentPassword, newPassword);
        if (!result.success) {
            return res.status(400).json({ msg: result.message });
        }

        res.status(200).json({ success: true, msg: result.message });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};
