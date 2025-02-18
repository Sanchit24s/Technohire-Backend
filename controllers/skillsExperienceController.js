const SkillsExperience = require("../models/skillsExperienceModel");

exports.addSkillsExperience = async (req, res) => {
    try {
        const { skills, experienceLevel, workHistory } = req.body;

        const skillsExperience = await SkillsExperience.create({
            user: req.user._id,
            skills,
            experienceLevel,
            workHistory,
        });

        res.status(201).json({ success: true, skillsExperience });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
