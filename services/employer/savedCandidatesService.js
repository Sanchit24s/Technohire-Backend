const SavedCandidate = require('../../models/employer/SavedCandidate.js');

exports.getSavedCandidates = async (employerId) => {
    return await SavedCandidate.find({ userId: employerId });
};

exports.saveCandidate = async (userId, candidateData) => {
    const candidate = new SavedCandidate({ userId, ...candidateData });
    await candidate.save();
    return candidate;
};

exports.updateSavedCandidate = async (id, candidateData) => {
    return await SavedCandidate.findByIdAndUpdate(id, candidateData, { new: true });
};

exports.deleteSavedCandidate = async (id) => {
    return await SavedCandidate.findByIdAndDelete(id);
};
