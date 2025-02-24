const express = require("express");
const router = express.Router();
const {
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
  updateApplication
} = require("../controllers/applicationController");
const {protect} = require("../middlewares/authMiddleware.js")

router.get("/", getApplications); // Get all applications (with filters & sorting)
router.get("/shortlistedapplications", getShortlistedApplications); // Get all shortlisted applications
router.get("/applicationByJobId/:id", applicationByJobId);
router.get("/downloadcv/:id", downloadCV);
router.get("/count/:id", applicationCount);
router.get("/:id", getApplicationById); // Get application by ID
// router.post("/createapplication", createApplication); // Create a new application
// router.put("/updateapplication/:id", updateApplication); // Update an application
router.delete("/deleteapplication/:id", deleteApplication); // Delete an application
router.post("/shortlistapplication/:id", shortlistApplication); // Shortlist an application
router.delete("/removeshortlist/:id", removeFromShortlist); // Remove from shortlist
router.delete("/deleteallapplications", deleteAllApplications); // Delete all applications

// New routes for screening and interview scheduling
router.put("/updatescreeningstatus/:id", updateScreeningStatus); // Update screening status
router.post("/scheduleinterview/:id", protect ,scheduleInterview); // Schedule an interview
router.get("/scheduledinterviews", getScheduledInterviews); // Get all scheduled interviews

//
router.post("/createapplication", createApplication)
router.put("/updateapplication/:id", updateApplication)
module.exports = router;
