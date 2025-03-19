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
            expireDate,
            company, // Required field: company ID
        } = req.body;

        // Get the employer ID from the authenticated user (attached by the protect middleware)
        const employerId = req.user._id;

        // Validate required fields
        if (!jobTitle || !jobDescription || !expireDate || !company) {
            return res.status(400).json({
                success: false,
                message: "Job title, description, expire date, and company are required.",
            });
        }

        // Create a new job
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
            expireDate,
            company, // Required field: company ID
            employerId, // Attach the employer ID from the authenticated user
        });

        // Save the job to the database
        await newJob.save();

        return res.status(201).json({
            success: true,
            message: "Your job has been successfully posted!",
            job: newJob,
        });
    } catch (error) {
        console.error("Error creating job:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = createJob;
// update job
const updateJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const updateFields = req.body;

        // Validate jobId
        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required for updating.",
            });
        }

        // Find and update the job
        const updatedJob = await JobModel.findByIdAndUpdate(
            jobId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job updated successfully.",
            job: updatedJob,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

// get all jobs
const getAllJobs = async (req, res) => {
    try {
        const {
            jobTitle,
            role,
            jobType,
            location,
            experience,
            education,
            minSalary,
            maxSalary,
            skills,
            status,
        } = req.query;

        let filter = {};

        if (jobTitle) filter.jobTitle = { $regex: jobTitle, $options: "i" };
        if (role) filter.role = { $regex: role, $options: "i" };
        if (jobType) filter.jobType = jobType;
        if (location) filter.location = { $regex: location, $options: "i" };
        if (experience) filter.experience = { $regex: experience, $options: "i" };
        if (education) filter.education = { $regex: education, $options: "i" };
        if (minSalary) filter["salary.minSalary"] = { $gte: Number(minSalary) };
        if (maxSalary) filter["salary.maxSalary"] = { $lte: Number(maxSalary) };
        if (skills) filter.skillsRequired = { $all: skills.split(",") };
        if (status) filter.status = status;

        const Jobs = await JobModel.find(filter);
        res.status(200).json({ success: true, totalJobs: Jobs.length, Jobs });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

// get open job count
const getJobCount = async (req, res) => {
    try {
        const employerId = req.user._id;
        const jobs = await JobModel.find({ employerId, status: "Active" });

        res.status(200).json({ success: true, openJobsCount: jobs.length });
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

// get latest jobs
const getLatestJobs = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        let filter = {};

        filter.status = "Active";

        const latestJobs = await JobModel.find(filter)
            .sort({ createdAt: -1 })
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            totalJobs: latestJobs.length,
            latestJobs,
        });
    } catch (error) {
        console.error("Error fetching latest jobs:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// toggle job status
const toggleJobStatus = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await JobModel.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        job.status = job.status === "Active" ? "Closed" : "Active";
        await job.save();

        res.status(200).json({
            success: true,
            message: `Job status updated to ${job.status}`,
            job,
        });
    } catch (error) {
        console.error("Error toggling job status:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getNewJobs = async (req, res) => {
    try {
        const currentDate = new Date();
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(currentDate.getDate() - 2);

        const newJobs = await JobModel.find({
            status: "Active",
            expireDate: { $gte: currentDate },
            createdAt: { $gte: twoDaysAgo },
        }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, newJobs });
    } catch (error) {
        console.error("Error fetching new jobs:", error);
        throw new Error("Failed to fetch new jobs");
    }
};

const getNewJobsCount = async (req, res) => {
    try {
        const currentDate = new Date();
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(currentDate.getDate() - 2);

        const newJobs = await JobModel.find({
            status: "Active",
            expireDate: { $gte: currentDate },
            createdAt: { $gte: twoDaysAgo },
        }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, newJobsCount: newJobs.length });
    } catch (error) {
        console.error("Error fetching new jobs:", error);
        throw new Error("Failed to fetch new jobs");
    }
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    getLatestJobs,
    toggleJobStatus,
    updateJob,
    getJobCount,
    getNewJobs,
    getNewJobsCount,
};
