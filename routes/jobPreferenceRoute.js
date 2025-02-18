const express = require("express");
const {
    setJobPreferences,
} = require("../controllers/jobPreferenceController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/set", protect, setJobPreferences);

module.exports = router;
