const express = require("express");
const {
    createJob,
    getAllJobs,
    getJobById,
    getLatestJobs,
    toggleJobStatus,
    updateJob,
    getJobCount,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/createJob", createJob);
router.get("/getAllJobs", getAllJobs);
router.get("/getOpenJobs", getJobCount);
router.get("/getJob/:id", getJobById);
router.get("/latestJobs", getLatestJobs);
router.put("/toggle-job-status/:jobId", toggleJobStatus);
router.put("/updateJob/:jobId", updateJob);

module.exports = router;