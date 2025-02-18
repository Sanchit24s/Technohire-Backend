const mongoose = require("mongoose");

const JobPreferencesSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        jobType: [
            {
                type: String,
                enum: ["Full Time", "Part Time", "Freelance", "Internship"],
            },
        ],
        preferredLocation: { type: String },
        salaryRange: {
            min: { type: Number },
            max: { type: Number },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("JobPreferences", JobPreferencesSchema);
