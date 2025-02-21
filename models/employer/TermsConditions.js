const mongoose = require('mongoose');

const TermsConditionsSchema = new mongoose.Schema({
    section: { type: String, required: true },
    content: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.models.TermsConditions || mongoose.model('TermsConditions', TermsConditionsSchema);
