const Employer = require("../../models/Employer");
const savedCandidatesService = require("../../services/employer/savedCandidatesService");

exports.getSavedCandidates = async (req, res) => {
    try {
        const candidates = await savedCandidatesService.getSavedCandidates(
            req.user._id
        );
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.saveCandidate = async (req, res) => {
    try {
        const candidate = await savedCandidatesService.saveCandidate(
            req.user._id,
            req.body
        );
        res.status(201).json(candidate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateSavedCandidate = async (req, res) => {
    try {
        const candidate = await savedCandidatesService.updateSavedCandidate(
            req.params.id,
            req.body
        );
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

exports.getSavedCandidatesCount = async (req, res) => {
    try {
        const id = req.user._id;
        const employer = await Employer.findById(id);
        if (!employer) {
            return res.status(404).json({ message: "Employer not found" });
        }
        res.status(200).json({
            success: true,
            savedCandidatesCount: employer.savedCandidates.length,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addCandidate = async (req, res) => {
    try {
        const id = req.user._id;
        const { userId } = req.params;

        const employer = await Employer.findById(id);
        if (!employer) {
            return res.status(404).json({ message: "Employer not found" });
        }

        if (employer.savedCandidates.includes(userId)) {
            return res
                .status(400)
                .json({ success: false, message: "Candidate already saved." });
        }

        employer.savedCandidates.push(userId);
        await employer.save();
        res.status(200).json({ message: "Candidate saved successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeSavedCandidate = async (req, res) => {
    try {
        const id = req.user._id;
        const { userId } = req.params;

        const employer = await Employer.findById(id);
        if (!employer) {
            return res.status(404).json({ message: "Employer not found" });
        }

        if (!employer.savedCandidates.includes(userId)) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Candidate not found in the saved list.",
                });
        }

        // remove candidate if exits
        const index = employer.savedCandidates.indexOf(userId);
        employer.savedCandidates.splice(index, 1);
        await employer.save();
        res
            .status(200)
            .json({ message: "Candidate removed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
