const Profile = require("../models/profileModel");

exports.completeProfile = async (req, res) => {
    try {
        const { dateOfBirth, phoneNumber, city, country } = req.body;

        // Validate required fields
        if (!dateOfBirth || !phoneNumber || !city || !country) {
            return res.status(400).json({ msg: "All fields are required!" });
        }

        // Extract file paths safely
        const photoPath = req.files?.photo ? req.files["photo"][0].path : null;
        const resumePath = req.files?.resume ? req.files["resume"][0].path : null;

        // Create profile
        const profile = await Profile.create({
            user: req.user._id,
            dateOfBirth,
            phoneNumber,
            city,
            country,
            photo: photoPath,
            resume: resumePath,
        });

        res.status(201).json({ msg: "Profile completed successfully!", profile });
    } catch (error) {
        console.error("Error completing profile:", error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};

