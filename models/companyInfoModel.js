const mongoose = require("mongoose");

const companyInfoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    aboutUs: { type: String },
    logo: { type: String },
    bannerImage: { type: String },
});

module.exports = mongoose.model("CompanyInfo", companyInfoSchema);
