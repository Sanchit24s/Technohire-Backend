const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema(
    {
        role: { type: String },
        profilePic: { type: String },
        profileCompletion: { type: Number, default: 0 },
        savedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
        fullName: { type: String, required: true }, // Ensure `fullName` is required
        userName: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, "Invalid email format."],
        },
        phone: {
            type: String,
            unique: true,
            match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format."],
        },
        password: { type: String, required: true }, // Ensure password is required
        isVerified: { type: Boolean, default: false },
        verificationToken: { type: String },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date },
        otp: { type: String },
        otpExpires: { type: Date },
        phoneVerified: { type: Boolean, default: false },
        savedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Employer", EmployerSchema);
