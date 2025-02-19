const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, "Invalid email format."]
    },
    password: { type: String },
    googleId: { type: String },
    linkedinId: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    otp: {type: String},
    otpExpires: {type: Date}
}, { timestamps: true });

module.exports = mongoose.model('Employer', EmployerSchema);
