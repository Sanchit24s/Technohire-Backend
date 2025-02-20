const savedCandidatesService = require('../../services/employer/savedCandidatesService');

exports.getSavedCandidates = async (req, res) => {
    try {
        const candidates = await savedCandidatesService.getSavedCandidates(req.user._id);
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.saveCandidate = async (req, res) => {
    try {
        const candidate = await savedCandidatesService.saveCandidate(req.user._id, req.body);
        res.status(201).json(candidate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateSavedCandidate = async (req, res) => {
    try {
        const candidate = await savedCandidatesService.updateSavedCandidate(req.params.id, req.body);
        res.status(200).json(candidate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSavedCandidate = async (req, res) => {
    try {
        await savedCandidatesService.deleteSavedCandidate(req.params.id);
        res.status(204).json({ message: "Candidate deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
