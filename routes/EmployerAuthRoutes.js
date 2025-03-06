const express = require('express');
const { 
    register, 
    verifyEmail, 
    forgotPassword, 
    resetPassword, 
    login, 
    getEmployerDetails, 
    verifyPhone, 
    sendPhoneOtp,
    verifyEmailOTP,
} = require('../controllers/EmployerAuthController.js');
const { protect } = require('../middlewares/EmployerAuthMiddleware.js');

const router = express.Router();

// Register
router.post('/register', register);

// Verify email with OTP
router.post('/verify-email', verifyEmailOTP);  // Removed `protect`

// Send OTP for phone verification
router.post('/send-phone-otp', protect, sendPhoneOtp);

// Verify phone with OTP
router.post('/verify-phone', protect, verifyPhone);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password (assuming token-based reset)
router.post('/reset-password/:token', resetPassword);

// Get employer details (should it require authentication?)
router.get('/employerdetails/:id', protect, getEmployerDetails); 

// Login
router.post('/login', login);

module.exports = router;
