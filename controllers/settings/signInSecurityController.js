const signInSecurityService = require('../../services/settings/signInSecurityService');

exports.getSignInSecurity = async (req, res) => {
    try {
        const signInSecurity = await signInSecurityService.getSignInSecurity(req.user._id);
        res.status(200).json(signInSecurity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSignInSecurity = async (req, res) => {
    try {
        const signInSecurity = await signInSecurityService.createSignInSecurity(req.user._id, req.body);
        res.status(201).json(signInSecurity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSignInSecurity = async (req, res) => {
    try {
        const updatedSignInSecurity = await signInSecurityService.updateSignInSecurity(req.user._id, req.body);
        res.status(200).json(updatedSignInSecurity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
