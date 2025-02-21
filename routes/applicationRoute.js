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
} = require("../controllers/applicationController");

router.get("/", getApplications); // Get all applications (with filters & sorting)
router.get("/shortlistedapplications", getShortlistedApplications); // Get all shortlisted applications
router.get("/downloadcv/:id", downloadCV);
router.get("/count/:id", applicationCount);
router.get("/:id", getApplicationById); // Get application by ID
// router.post("/createapplication", createApplication); // Create a new application
// router.put("/updateapplication/:id", updateApplication); // Update an application
router.delete("/deleteapplication/:id", deleteApplication); // Delete an application
router.post("/shortlistapplication/:id", shortlistApplication); // Shortlist an application
router.delete("/removeshortlist/:id", removeFromShortlist); // Remove from shortlist
router.delete("/deleteallapplications", deleteAllApplications); // Delete all applications

module.exports = router;
