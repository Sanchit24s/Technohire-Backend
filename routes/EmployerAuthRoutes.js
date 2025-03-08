const express = require('express');
const {
    register,
    login,
    sendEmailVerificationOTP,
    verifyEmailOTP,
    sendPhoneOtp,
    verifyPhone,
    forgotPassword,
    resetPassword,
    getEmployerDetails,
} = require('../controllers/EmployerAuthController.js');
const { protect } = require('../middlewares/EmployerAuthMiddleware.js');

const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Send Email Verification OTP
router.post('/send-email-verification-otp', sendEmailVerificationOTP);

// Verify Email OTP
router.post('/verify-email-otp', verifyEmailOTP);

// Send Phone OTP
router.post('/send-phone-otp', protect, sendPhoneOtp);

// Verify Phone OTP
router.post('/verify-phone', protect, verifyPhone);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Reset Password
router.post('/reset-password/:token', resetPassword); // Use POST for resetting password

// Get Employer Details
router.get('/employerdetails/:id', getEmployerDetails);

module.exports = router;