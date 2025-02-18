const TermsConditions = require("../models/termsConditionModel");

// Create new Terms & Conditions
const createTerms = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content || !Array.isArray(content)) {
            return res.status(400).json({ error: "Invalid data format" });
        }

        const terms = new TermsConditions({ content });
        await terms.save();

        res.status(201).json({ message: "Terms & Conditions saved", terms });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get latest Terms & Conditions
const getLatestTerms = async (req, res) => {
    try {
        const latestTerms = await TermsConditions.findOne().sort({ createdAt: -1 });
        if (!latestTerms) {
            return res.status(404).json({ error: "No terms found" });
        }

        res.json(latestTerms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Terms & Conditions
const updateTerms = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content || !Array.isArray(content)) {
            return res.status(400).json({ error: "Invalid data format" });
        }

        const latestTerms = await TermsConditions.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { content } },
            { new: true }
        );

        if (!latestTerms) {
            // If no Terms & Conditions exist, create a new one
            return res.send("Terms And Condition Does Not Exists");
        }

        res.json({ message: "Terms & Conditions updated", terms: latestTerms });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTerms, getLatestTerms, updateTerms };
