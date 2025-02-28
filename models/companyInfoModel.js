const mongoose = require("mongoose");

const companyInfoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    aboutUs: { type: String },
    vision: { type: String }, // Added vision field
    benefits: { type: String }, // Corrected spelling from benfits to benefits
    foundedIn: { type: Number }, // Removed duplicate
    orgType: { type: String }, // Aligned with request body
    teamSize: { type: Number }, // Number of employees
    industry: { type: String }, // Aligned with request body
    website: { type: String },  
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    location: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    youtube: { type: String },
    logo: { type: String },
    bannerImage: { type: String },
});

module.exports = mongoose.model("CompanyInfo", companyInfoSchema);
