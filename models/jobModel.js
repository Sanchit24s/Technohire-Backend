const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
    {
        jobTitle: {
            type: String,
            required: true,
            trim: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        role: {
            type: String,
            trim: true,
        },
        salary: {
            minSalary: {
                type: Number,
            },
            maxSalary: {
                type: Number,
            },
        },
        education: {
            type: String,
            trim: true,
        },
        experience: {
            type: String,
            trim: true,
        },
        jobType: {
            type: String,
            enum: ["Full-time", "Part-time", "Contract", "Internship"],
            default: "Full-time",
        },
        location: {
            type: String,
            trim: true,
            default: "Remote",
        },
        skillsRequired: {
            type: [String],
            default: [],
        },
        jobDescription: {
            type: String,
            trim: true,
        },
        responsibilities: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const JobModel = model("Job", jobSchema);
module.exports = JobModel;
