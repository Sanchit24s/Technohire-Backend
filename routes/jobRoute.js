const express = require("express");
const {
    createJob,
    getAllJobs,
    getJobById,
    getLatestJobs,
    toggleJobStatus,
    updateJob,
    getJobCount,
    getNewJobs,
    getNewJobsCount,
    getEmployerJobs,
} = require("../controllers/jobController");
const { protect } = require("../middlewares/EmployerAuthMiddleware");

const router = express.Router();

router.post("/createJob", protect, createJob);
router.get("/getAllJobs", getAllJobs);
router.get("/getEmployerJobs", protect, getEmployerJobs);
router.get("/getOpenJobs", protect, getJobCount);
router.get("/getJob/:id", getJobById);
router.get("/latestJobs", getLatestJobs);
router.put("/toggle-job-status/:jobId", protect, toggleJobStatus);
router.put("/updateJob/:jobId", protect, updateJob);
router.get("/newJobs", getNewJobs);
router.get("/newJobsCount", getNewJobsCount);

module.exports = router;