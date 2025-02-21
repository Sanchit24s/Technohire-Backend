const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        userName: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^[a-zA-Z0-9_]{3,20}$/,
                "Username must be 3-20 characters long and contain only letters, numbers, and underscores.",
            ],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, "Invalid email format."],
        },
        password: { type: String, required: true },
        googleId: { type: String },
        facebookId: { type: String },
        linkedinId: { type: String },
        isVerified: { type: Boolean, default: false },
        verificationToken: { type: String },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date },
        profilePhoto: { type: String }, // Store photo path
        resume: { type: String }, // Store resume path
    },
    { timestamps: true }
);

// Prevent overwriting the model
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
