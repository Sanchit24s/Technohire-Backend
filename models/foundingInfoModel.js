const mongoose = require("mongoose");

const foundingInfoSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CompanyInfo",
        required: true,
    },
    organizationType: { type: String, required: true },
    industryTypes: { type: [String], required: true },
    teamSize: { type: String, required: true },
    yearOfEstablishment: { type: Date, required: true },
    companyWebsite: { type: String },
    companyVision: { type: String },
});

module.exports = mongoose.model("FoundingInfo", foundingInfoSchema);
