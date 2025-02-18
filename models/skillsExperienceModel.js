const mongoose = require("mongoose");

const SkillsExperienceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        skills: [{ type: String }],
        experienceLevel: {
            type: String,
            enum: ["Entry-Level", "Mid-Level", "Senior"],
            required: true,
        },
        workHistory: [
            {
                jobTitle: { type: String },
                company: { type: String },
                duration: { type: String },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("SkillsExperience", SkillsExperienceSchema);
