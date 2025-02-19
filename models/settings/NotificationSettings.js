const mongoose = require('mongoose');

const NotificationSettingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('NotificationSettings', NotificationSettingsSchema);
