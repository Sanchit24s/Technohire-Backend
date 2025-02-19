const Employer = require('../../models/Employer.js');
const bcrypt = require('bcrypt');

exports.changePassword = async (userId, oldPassword, newPassword) => {
    const employer = await Employer.findById(userId);
    if (!employer) {
        throw new Error('Employer not found');
    }

    const isMatch = await bcrypt.compare(oldPassword, employer.password);
    if (!isMatch) {
        throw new Error('Old password is incorrect');
    }

    employer.password = await bcrypt.hash(newPassword, 10);
    await employer.save();
    return { message: 'Password changed successfully' };
};
