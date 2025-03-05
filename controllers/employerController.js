const EmployerProfile = require("../models/EmployerProfile.js");
const Employer = require("../models/Employer.js");

// Create Employer Profile
exports.createEmployerProfile = async (req, res) => {
    try {
        const { foundedYear, sector, numberOfEmployees, location, socialLinks, Description } =
            req.body;

        // Ensure files are uploaded
        if (!req.files || !req.files['coverImage'] || !req.files['logo']) {
            return res.status(400).json({ msg: 'Please upload both coverImage and logo.' });
        }

        const employerProfile = await EmployerProfile.create({
            employer: req.user._id,
            foundedYear,
            sector,
            numberOfEmployees,
            location,
            socialLinks,
            Description,
            coverImage: req.files['coverImage'][0].path, // Save file path
            logo: req.files['logo'][0].path, // Save file path
        });

        res.status(201).json({ employerProfile });
    } catch (error) {
        console.error('Error creating employer profile:', error);
        res.status(500).json({ msg: error.message });
    }
};

// Update Employer Profile
exports.updateEmployerProfile = async (req, res) => {
    try {
        const { foundedYear, sector, numberOfEmployees, location, socialLinks, Description } =
            req.body;

        const updatedData = {
            foundedYear,
            sector,
            numberOfEmployees,
            location,
            socialLinks,
            Description,
        };

        // Update coverImage if provided
        if (req.files?.coverImage) {
            updatedData.coverImage = req.files['coverImage'][0].path;
        }

        // Update logo if provided
        if (req.files?.logo) {
            updatedData.logo = req.files['logo'][0].path;
        }

        const employerProfile = await EmployerProfile.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.status(200).json({ employerProfile });
    } catch (error) {
        console.error('Error updating employer profile:', error);
        res.status(500).json({ msg: error.message });
    }
};

// Get Employer Profile
// Get Employer Profile
// Get Employer Profile
exports.getEmployerProfile = async (req, res) => {
    try {
        console.log("Fetching Employer Profile with ID:", req.params.id);
        const employerProfile = await EmployerProfile.findById(
            req.params.id
        ).populate("employer");
        if (!employerProfile) {
            console.log("Employer Profile not found");
            return res.status(404).json({ msg: "Employer profile not found" });
        }
        console.log("Employer Profile found:", employerProfile);
        res.status(200).json({ employerProfile });
    } catch (error) {
        console.error("Error fetching Employer Profile:", error);
        res.status(500).json({ msg: error.message });
    }
};

// Delete Employer Profile
exports.deleteEmployerProfile = async (req, res) => {
    try {
        const employerProfile = await EmployerProfile.findByIdAndDelete(
            req.params.id
        );
        if (!employerProfile) {
            return res.status(404).json({ msg: "Employer not found" });
        }
        res.status(200).json({ msg: "Employer profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
