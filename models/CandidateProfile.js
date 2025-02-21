const mongoose = require('mongoose');

const CandidateProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    experience: { type: String },
    salary: { type: String },
    jobType: { type: String },
    education: { type: String },
    candidateLevel: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.CandidateProfile || mongoose.model('CandidateProfile', CandidateProfileSchema);
