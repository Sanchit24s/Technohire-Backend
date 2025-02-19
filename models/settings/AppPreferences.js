const mongoose = require('mongoose');

const AppPreferencesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
    displayMode: { type: String, default: 'light' },
    language: { type: String, default: 'en' },
    profileType: { type: String, default: 'public' },
    searchHistory: { type: Boolean, default: true },
    savedContents: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('AppPreferences', AppPreferencesSchema);
