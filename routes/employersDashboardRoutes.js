const express = require("express");
const employersDashboardController = require("../controllers/employersDashboardController");

const router = express.Router();

router.get(
  "/:employerId/profile",
  employersDashboardController.getEmployerProfile
);
router.get(
  "/:employerId/profile-completion",
  employersDashboardController.getEmployerCompletion
);
router.get("/:employerId/stats", employersDashboardController.getEmployerStats);
router.get(
  "/:employerId/recent-jobs",
  employersDashboardController.getRecentJobs
);
router.put("/job/:jobId/expire", employersDashboardController.markJobExpired);

module.exports = router;
