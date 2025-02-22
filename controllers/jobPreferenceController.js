const JobPreferences = require("../models/jobPreferenceModel");

exports.setJobPreferences = async (req, res) => {
    try {
        const { jobType, preferredLocation, salaryRange } = req.body;

        const preferences = await JobPreferences.create({
            user: req.user._id,
            jobType,
            preferredLocation,
            salaryRange,
        });

        res.status(201).json({ preferences });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getJobPreferences = async (req, res) => {
    try {
        const preferences = await JobPreferences.findOne({ user: req.user._id });
        if (!preferences) {
            return res.status(404).json({ msg: "No Job preference found for this user" });
        }
        res.status(200).json({ preferences }); // Add this line
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};