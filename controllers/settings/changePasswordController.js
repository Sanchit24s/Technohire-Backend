const changePasswordService = require('../../services/settings/changePasswordService');

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const result = await changePasswordService.changePassword(req.user._id, oldPassword, newPassword);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
