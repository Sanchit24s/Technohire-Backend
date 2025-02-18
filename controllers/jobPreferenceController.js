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
