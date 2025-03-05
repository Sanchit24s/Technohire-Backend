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
const {protect} = require('../middlewares/EmployerAuthMiddleware.js')

const router = express.Router();

// Register
router.post('/register', register);

// Verify email
router.post('/verify-email', protect, verifyEmailOTP);

// Send OTP for phone verification
router.post('/send-phone-otp', protect,sendPhoneOtp);

// Verify phone with OTP
router.post('/verify-phone', protect,verifyPhone);

// Forgot password
router.post('/forgot-password', protect,forgotPassword);

// Reset password
router.post('/reset-password', protect,resetPassword);

// Get employer details
router.get('/employerdetails/:id', getEmployerDetails);

// Login
router.post('/login', login);

module.exports = router;
