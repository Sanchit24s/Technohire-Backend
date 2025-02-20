const termsConditionsService = require('../../services/employer/termsConditionsService');

exports.getTermsConditions = async (req, res) => {
    try {
        const terms = await termsConditionsService.getTermsConditions();
        res.status(200).json(terms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTermsCondition = async (req, res) => {
    try {
        const terms = await termsConditionsService.createTermsCondition(req.body);
        res.status(201).json(terms);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTermsCondition = async (req, res) => {
    try {
        const terms = await termsConditionsService.updateTermsCondition(req.params.id, req.body);
        res.status(200).json(terms);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
