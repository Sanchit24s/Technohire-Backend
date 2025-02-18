const JobModel = require("../models/jobModel");

// post a job
const createJob = async (req, res) => {
    try {
        const {
            jobTitle,
            tags,
            role,
            salary,
            education,
            experience,
            jobType,
            location,
            skillsRequired,
            jobDescription,
            responsibilities,
        } = req.body;

        // validate required fields
        if (!jobTitle || !jobDescription) {
            return res.status(400).json({
                success: false,
                message: "Job title and description are required.",
            });
        }

        const newJob = new JobModel({
            jobTitle,
            tags: tags || [],
            role,
            salary: salary || {},
            education,
            experience,
            jobType: jobType || "Full-time",
            location: location || "Remote",
            skillsRequired: skillsRequired || [],
            jobDescription,
            responsibilities: responsibilities || [],
        });

        await newJob.save();

        return res.status(201).json({
            success: true,
            message: "Your Job is successfully posted!",
            job: newJob,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

// get all jobs
const getAllJobs = async (req, res) => {
    try {
        const Jobs = await JobModel.find();
        res.status(200).json({ success: true, totalJobs: Jobs.length, Jobs });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

// get job by id
const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid id" });
        }

        const job = await JobModel.findById(id);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        return res.status(200).json({ success: true, job });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

module.exports = { createJob, getAllJobs, getJobById };
