const mongoose = require('mongoose');

const EmployerSettingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
    theme: { type: String, default: 'light' },
    language: { type: String, default: 'en' },
    profileVisibility: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('EmployerSettings', EmployerSettingsSchema);
