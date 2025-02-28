const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const EmployerSettingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Employer", required: true },
    password: { type: String, required: true },
    settings: {
        appPreferences: {
            theme: { type: String, default: "light" },
            visibility: { type: String, default: "public" },
            searchHistory: { type: Boolean, default: true },
        },
        notifications: {
            allNotifications: { type: Boolean, default: false },
            candidateUpdates: { type: Boolean, default: false },
            personalMessages: { type: Boolean, default: false },
            candidateRecommendations: { type: Boolean, default: false },
            messageRejection: { type: Boolean, default: true },
            messageAcceptance: { type: Boolean, default: false },
        }
    }
});

// Hash password before saving
EmployerSettingsSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('EmployerSettings', EmployerSettingsSchema);
