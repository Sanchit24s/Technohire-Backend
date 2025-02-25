const EmployerAccountSetting = require("../../models/settings/EmployerAccountSetting");
const Employer = require("../../models/Employer");
const bcrypt = require("bcryptjs");

// Get Employer Account Settings
exports.getAccountSetting = async (req, res) => {
  try {
    const settings = await EmployerAccountSetting.findOne({ employerId: req.user.id });
    if (!settings) {
      return res.status(404).json({ msg: "Settings not found" });
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Create Employer Account Settings
exports.createAccountSettings = async (req, res) => {
  try {
    const { mapLocation, phone, countryCode, email } = req.body;
    const employerId = req.user.id;

    const existingSettings = await EmployerAccountSetting.findOne({ employerId });
    if (existingSettings) {
      return res.status(400).json({ msg: "Settings already exist" });
    }

    const settings = new EmployerAccountSetting({ employerId, mapLocation, phone, countryCode, email });
    await settings.save();

    res.status(201).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Update Employer Account Settings
exports.updateSettings = async (req, res) => {
  try {
    const { mapLocation, phone, countryCode, email } = req.body;
    const employerId = req.user.id;

    let settings = await EmployerAccountSetting.findOne({ employerId });
    if (!settings) {
      return res.status(404).json({ msg: "Settings not found. Create settings first." });
    }

    settings.mapLocation = mapLocation;
    settings.phone = phone;
    settings.countryCode = countryCode;
    settings.email = email;

    await settings.save();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Delete Employer Account Settings
exports.deleteSettings = async (req, res) => {
  try {
    const deleted = await EmployerAccountSetting.findOneAndDelete({ employerId: req.user.id });
    if (!deleted) {
      return res.status(404).json({ msg: "Settings not found" });
    }
    res.status(200).json({ success: true, msg: "Settings deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Change Employer Password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const employer = await Employer.findById(req.user.id);

    if (!employer) {
      return res.status(404).json({ msg: "Employer not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, employer.password);
    if (!isMatch) return res.status(400).json({ msg: "Current password is incorrect" });
    if (newPassword !== confirmPassword) return res.status(400).json({ msg: "New password and confirm password do not match" });

    const salt = await bcrypt.genSalt(10);
    employer.password = await bcrypt.hash(newPassword, salt);
    await employer.save();

    res.status(200).json({ success: true, msg: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
