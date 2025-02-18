const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        dateOfBirth: { type: Date, required: true },
        phoneNumber: {
            type: String,
            required: true,
            match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
        },
        city: { type: String, required: true },
        country: { type: String, required: true },
        photo: { type: String }, // Path to uploaded image
        resume: { type: String }, // Path to uploaded resume
    },
    { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
