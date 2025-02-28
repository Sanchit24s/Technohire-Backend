const EmployerSettings = require('../../models/settings/EmployerSettings');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.getSettings = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) return null;
    return await EmployerSettings.findOne({ userId });
};

exports.createSettings = async (userId, settingsData) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new Error("Invalid user ID");
    const existingSettings = await EmployerSettings.findOne({ userId });
    if (existingSettings) throw new Error("Settings already exist");

    const settings = new EmployerSettings({ userId, ...settingsData });
    return await settings.save();
};

exports.updateSettings = async (userId, settingsData) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new Error("Invalid user ID");
    return await EmployerSettings.findOneAndUpdate({ userId }, settingsData, { new: true });
};

exports.changePassword = async (userId, currentPassword, newPassword) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return { success: false, message: "Invalid user ID" };
    }

    const employer = await EmployerSettings.findOne({ userId });
    if (!employer) {
        return { success: false, message: "Employer not found" };
    }

    const isMatch = await bcrypt.compare(currentPassword, employer.password);
    if (!isMatch) {
        return { success: false, message: "Current password is incorrect" };
    }

    const salt = await bcrypt.genSalt(10);
    employer.password = await bcrypt.hash(newPassword, salt);
    await employer.save();

    return { success: true, message: "Password updated successfully" };
};
