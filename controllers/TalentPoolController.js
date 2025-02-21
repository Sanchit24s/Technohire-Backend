const User = require('../models/userModel.js'); // Correctly import User model
const CandidateProfile = require('../models/CandidateProfile.js');

// Invite Candidate to Apply
exports.inviteToApply = async (req, res) => {
    try {
        const { candidateId, message } = req.body;
        const candidate = await User.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ msg: 'Candidate not found' });
        }
        // Implement email sending logic here
        // sendInvitationEmail(candidate, message);

        res.status(200).json({ msg: 'Invitation sent successfully' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Browse Candidates
exports.browseCandidates = async (req, res) => {
    try {
        const candidates = await CandidateProfile.find().populate('user');
        res.status(200).json({ candidates });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Filter Candidates
exports.filterCandidates = async (req, res) => {
    try {
        const filters = req.body;
        let query = {};

        if (filters.experience) {
            query.experience = { $in: filters.experience };
        }
        if (filters.salary) {
            query.salary = { $in: filters.salary };
        }
        if (filters.jobType) {
            query.jobType = { $in: filters.jobType };
        }
        if (filters.education) {
            query.education = { $in: filters.education };
        }
        if (filters.candidateLevel) {
            query.candidateLevel = { $in: filters.candidateLevel };
        }

        const candidates = await CandidateProfile.find(query).populate('user');
        res.status(200).json({ candidates });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
