const CandidateProfile = require('../models/CandidateProfile.js');

exports.createCandidateProfile = async (req, res) => {
    try {
        const { user, experience, salary, jobType, education, candidateLevel } = req.body;

        const candidateProfile = new CandidateProfile({
            user,
            experience,
            salary,
            jobType,
            education,
            candidateLevel
        });

        await candidateProfile.save();

        res.status(201).json({ candidateProfile });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.updateCandidateProfile = async (req, res) => {
    try {
        const { experience, salary, jobType, education, candidateLevel } = req.body;

        const updatedData = {
            experience,
            salary,
            jobType,
            education,
            candidateLevel
        };

        const candidateProfile = await CandidateProfile.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        res.status(200).json({ candidateProfile });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getCandidateProfile = async (req, res) => {
    try {
        const candidateProfile = await CandidateProfile.findById(req.params.id).populate('user');
        if (!candidateProfile) return res.status(404).json({ msg: 'Candidate profile not found' });

        res.status(200).json({ candidateProfile });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.deleteCandidateProfile = async (req, res) => {
    try {
        const candidateProfile = await CandidateProfile.findByIdAndDelete(req.params.id);
        if (!candidateProfile) return res.status(404).json({ msg: 'Candidate profile not found' });

        res.status(200).json({ msg: 'Candidate profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
