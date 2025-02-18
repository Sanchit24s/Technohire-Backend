const express = require("express");
const {
    addSkillsExperience,
} = require("../controllers/skillsExperienceController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/add", protect, addSkillsExperience);

module.exports = router;
