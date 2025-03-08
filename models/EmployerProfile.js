const mongoose = require('mongoose');

const EmployerProfileSchema = new mongoose.Schema({
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
    coverImage: { type: String }, // Path to uploaded image
    logo: { type: String }, // Path to uploaded logo
    foundedYear: { type: Number, required: true },
    sector: { type: String, required: true },
    location: { type: String, required: true },
    numberOfEmployees: { type: Number, required: true },
    Description: {type: String, require: true},
    socialLinks: {
        facebook: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
        instagram: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('EmployerProfile', EmployerProfileSchema);
