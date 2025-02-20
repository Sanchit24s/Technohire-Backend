const mongoose = require('mongoose');

const SavedCandidateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
    candidateName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    profileLink: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('SavedCandidate', SavedCandidateSchema);
