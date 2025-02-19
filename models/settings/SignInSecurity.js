const mongoose = require('mongoose');

const SignInSecuritySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    twoStepVerification: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('SignInSecurity', SignInSecuritySchema);
