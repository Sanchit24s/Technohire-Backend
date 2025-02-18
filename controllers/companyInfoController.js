const Company = require("../models/companyInfoModel"); // Import the Company model

// CREATE COMPANY INFO
const createCompany = async (req, res) => {
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

//  UPDATE COMPANY INFO
const updateCompany = async (req, res) => {
    try {
        const { name, aboutUs } = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const company = await Company.findById(id);

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        // Update fields if provided
        if (name) company.name = name;
        if (aboutUs) company.aboutUs = aboutUs;

        if (req.files["logo"]) {
            company.logo = req.files["logo"][0].path;
        }

        if (req.files["bannerImage"]) {
            company.bannerImage = req.files["bannerImage"][0].path;
        }

        await company.save();

        res.status(200).json({ message: "Company updated successfully", company });
    } catch (error) {
        console.error("Error updating company:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET ALL COMPANIES INFO
const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find({});
        res.status(200).json({ companies });
    } catch (error) {
        console.error("Error getting company:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET COMPANY BY ID
const getCompany = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Id is required." });
        }

        const company = await Company.findById(id);

        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }

        res.status(200).json({ message: "Company fetched successfully.", company });
    } catch (error) {
        console.error("Error getting company:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Id is required." });
        }

        const company = await Company.findById(id);

        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }

        await Company.findByIdAndDelete(id);
        res.status(200).json({ message: "Company deleted successfully" });
    } catch (error) {
        console.error("Error deleting company:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createCompany,
    updateCompany,
    getAllCompanies,
    getCompany,
    deleteCompany,
};
