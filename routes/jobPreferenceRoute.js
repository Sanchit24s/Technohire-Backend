const express = require("express");
const {
    setJobPreferences,
    getJobPreferences,
} = require("../controllers/jobPreferenceController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/set", protect, setJobPreferences);

router.get("/get", protect, getJobPreferences )



module.exports = router;
