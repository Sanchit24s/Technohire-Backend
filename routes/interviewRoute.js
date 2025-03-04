const express = require("express");
const {
    createInterview,
    markAsCompleted,
    scheduleNext,
} = require("../controllers/interviewController");

const router = express.Router();

router.post("/create", createInterview);
router.put("/complete/:id", markAsCompleted);
router.put("/schedule-next/:id", scheduleNext);

module.exports = router;
