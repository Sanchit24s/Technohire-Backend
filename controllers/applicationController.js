const Application = require('../models/applicationModel.js');
const mongoose = require("mongoose");

// Get all applications with optional filtering and sorting
const getApplications = async (req, res) => {
  try {
    const { sort, filter, value } = req.query;
    let query = {};
    let sortQuery = {};

    if (filter) {
      if (filter === "shortlisted") {
        query[filter] = true;
      } else if (filter === "experience" && value) {
        query[filter] = { $gte: Number(value) };
      }
    }

    if (sort === "Newest") {
      sortQuery.createdAt = -1;
    } else if (sort === "Oldest") {
      sortQuery.createdAt = 1;
    }

    const applications = await Application.find(query).sort(sortQuery);
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get application counts
const applicationCount = async (req, res) => {
  try {
    const { id } = req.params;
    const count = await Application.countDocuments({ jobRefId: id });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get application by job
const applicationByJobId = async (req, res) => {
  try {
    const { id } = req.params;
    const applications = await Application.find({ jobRefId: id });
    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get application by ID
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Create a new application
const createApplication = async (req, res) => {
  try {
    const { userRefId, jobRefId, name, designation, experience, education, resumeUrl } = req.body;

    if (!userRefId || !jobRefId || !name || !designation || !experience || !education || !resumeUrl) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newApplication = new Application({
      userRefId,
      jobRefId,
      name,
      designation,
      experience,
      education,
      resumeUrl,
    });

    await newApplication.save();
    res.status(201).json({ message: "Application created successfully", newApplication });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Update an application by ID
const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    const updatedApplication = await Application.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ message: "Application updated successfully", updatedApplication });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Delete an application by ID
const deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete application", details: error.message });
  }
};

// Get all shortlisted applications
const getShortlistedApplications = async (req, res) => {
  try {
    const shortlistedApplications = await Application.find({ shortlisted: true });
    res.json(shortlistedApplications);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Shortlist an application
const shortlistApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { shortlisted: true },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json({ message: "Application shortlisted successfully", application });
  } catch (error) {
    res.status(400).json({ error: "Failed to shortlist application", details: error.message });
  }
};

// Remove from shortlist
const removeFromShortlist = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { shortlisted: false },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json({ message: "Application removed from shortlist", application });
  } catch (error) {
    res.status(400).json({ error: "Failed to update shortlist status", details: error.message });
  }
};

// Delete all applications
const deleteAllApplications = async (req, res) => {
  try {
    const { confirm } = req.query;
    if (confirm !== "true") {
      return res.status(400).json({ error: "Confirmation required. Add '?confirm=true' to proceed." });
    }
    await Application.deleteMany({});
    res.json({ message: "All applications deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete applications", details: error.message });
  }
};

// Download CV
const downloadCV = async (req, res) => {
  try {
    const applicationId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ error: "Invalid application ID format" });
    }
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json({ resumeUrl: application.resumeUrl });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Update screening status
const updateScreeningStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { screeningStatus } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      { screeningStatus },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.json({ message: "Screening status updated successfully", application });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Schedule an interview
const scheduleInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { interviewDate } = req.body;
    const employerId = req.user.id;

    const application = await Application.findById(id).populate("jobRefId");
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    if (application.jobRefId.employerRefId.toString() !== employerId) {
      return res.status(403).json({ error: "Unauthorized: You do not own this job posting" });
    }

    application.interviewDate = interviewDate;
    application.interviewScheduled = true;
    await application.save();

    res.json({ message: "Interview scheduled successfully", application });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get all scheduled interviews
const getScheduledInterviews = async (req, res) => {
  try {
    const applications = await Application.find({ interviewScheduled: true });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = {
  getApplications,
  getApplicationById,
  deleteApplication,
  getShortlistedApplications,
  shortlistApplication,
  removeFromShortlist,
  deleteAllApplications,
  downloadCV,
  applicationCount,
  applicationByJobId,
  updateScreeningStatus,
  scheduleInterview,
  getScheduledInterviews,
  createApplication,
  updateApplication,
};