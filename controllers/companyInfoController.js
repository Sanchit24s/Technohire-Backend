const Company = require("../models/companyInfoModel"); // Import the Company model

// CREATE COMPANY INFO
exports.createCompany = async (req, res) => {
    try {
        const { name, aboutUs } = req.body;

        if (!name || !aboutUs) {
            return res.status(400).json({ error: "Name and About Us are required." });
        }

        // Upload images (if provided)
        let logoUrl = null;
        let bannerUrl = null;

        if (req.files["logo"]) {
            logoUrl = req.files["logo"][0].path; // Cloudinary URL
        }

        if (req.files["bannerImage"]) {
            bannerUrl = req.files["bannerImage"][0].path; // Cloudinary URL
        }

        // Create new company entry
        const company = new Company({
            name,
            aboutUs,
            logo: logoUrl,
            bannerImage: bannerUrl,
        });

        await company.save();

        res.status(201).json({ message: "Company created successfully", company });
    } catch (error) {
        console.error("Error creating company:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

