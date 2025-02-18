const express = require("express");
const { createJob, getAllJobs, getJobById } = require("../controllers/jobController");

const router = express.Router();

router.post("/createJob", createJob);
router.get("/getAllJobs", getAllJobs);
router.get("/getJob/:id", getJobById);

module.exports = router;