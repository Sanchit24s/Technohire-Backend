const Company = require("../models/companyInfoModel"); // Import the Company model
const Employer = require("../models/Employer");

const createCompany = async (req, res) => {
    try {
        const {
            name, aboutUs, vision, benefits, website, email, phone, location,
            foundedIn, orgType, teamSize, industry, facebook, instagram, twitter, youtube
        } = req.body;

        if (!name || !aboutUs || !email || !phone) {
            return res.status(400).json({ error: "Name, About Us, Email, and Phone are required." });
        }

        // Handle file uploads (Check if multer is configured correctly)
        let logoUrl = req.files?.logo ? req.files.logo[0].path : null;
        let bannerUrl = req.files?.bannerImage ? req.files.bannerImage[0].path : null;

        // Create new company entry
        const company = new Company({
            name, aboutUs, vision, benefits, website, email, phone, location,
            foundedIn, orgType, teamSize, industry, facebook, instagram, twitter, youtube,
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
// UPDATE COMPANY INFO
const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Company ID is required" });

        const company = await Company.findById(id);
        if (!company) return res.status(404).json({ message: "Company not found" });

        Object.assign(company, req.body);

        if (req.files["logo"]) company.logo = req.files["logo"][0].path;
        if (req.files["bannerImage"]) company.bannerImage = req.files["bannerImage"][0].path;

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
        console.error("Error fetching companies:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET COMPANY BY ID
const getCompany = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Company ID is required." });

        const company = await Company.findById(id);
        if (!company) return res.status(404).json({ message: "Company not found." });

        res.status(200).json({ message: "Company fetched successfully.", company });
    } catch (error) {
        console.error("Error fetching company:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE COMPANY INFO
const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Company ID is required." });

        const company = await Company.findByIdAndDelete(id);
        if (!company) return res.status(404).json({ message: "Company not found." });

        res.status(200).json({ message: "Company deleted successfully" });
    } catch (error) {
        console.error("Error deleting company:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllCompaniesCount = async (req, res) => {
    try {
        const companies = await Employer.find();
        res.status(200).json({ companiesCount: companies.length });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = {
    createCompany,
    updateCompany,
    getAllCompanies,
    getCompany,
    deleteCompany,
    getAllCompaniesCount,
};
