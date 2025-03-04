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
} = require("../controllers/jobController");

const router = express.Router();

router.post("/createJob", createJob);
router.get("/getAllJobs", getAllJobs);
router.get("/getOpenJobs", getJobCount);
router.get("/getJob/:id", getJobById);
router.get("/latestJobs", getLatestJobs);
router.put("/toggle-job-status/:jobId", toggleJobStatus);
router.put("/updateJob/:jobId", updateJob);
router.get("/newJobs", getNewJobs);
router.get("/newJobsCount", getNewJobsCount);

module.exports = router;