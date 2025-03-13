const Employer = require("../models/Employer");
const Job = require("../models/jobModel");

exports.getEmployerProfile = async (req, res) => {
  try {
    const { employerId } = req.params;

    const employer = await Employer.findById(employerId);
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    res.status(200).json({
      fullName: employer.fullName,
      role: employer.role,
      profilePic: employer.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployerCompletion = async (req, res) => {
  try {
    const { employerId } = req.params;

    const employer = await Employer.findById(employerId);
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    res.status(200).json({
      profileCompletion: employer.profileCompletion,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get total open jobs and saved candidates count
exports.getEmployerStats = async (req, res) => {
  try {
    const { employerId } = req.params;

    // Count open jobs (status = "Active")
    const openJobsCount = await Job.countDocuments({
      employerId,
      status: "Active",
    });

    // Get saved candidates count
    const employer = await Employer.findById(employerId);
    if (!employer)
      return res.status(404).json({ message: "Employer not found" });

    const savedCandidatesCount = employer.savedCandidates.length;

    res.status(200).json({ openJobsCount, savedCandidatesCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recently posted jobs (last 4 jobs)
exports.getRecentJobs = async (req, res) => {
  try {
    const { employerId } = req.params;

    // Find last 4 jobs posted by employer, sorted by createdAt (descending)
    const recentJobs = await Job.find({ employerId })
      .sort({ createdAt: -1 })
      .limit(4)
      .select("jobTitle role expiryDate status applicants");

    // Calculate days remaining for expiry
    const jobsWithDaysRemaining = recentJobs.map((job) => ({
      jobTitle: job.jobTitle,
      role: job.role,
      daysRemaining: Math.max(
        0,
        Math.ceil((job.expiryDate - new Date()) / (1000 * 60 * 60 * 24))
      ), // Convert ms to days
      status: job.status,
      totalApplications: job.applicants.length,
    }));

    res.status(200).json(jobsWithDaysRemaining);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark a job as expired
exports.markJobExpired = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Find and update job status
    const job = await Job.findByIdAndUpdate(
      jobId,
      { status: "Expired" },
      { new: true }
    );
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ message: "Job marked as expired", job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
