const express = require('express');
const passport = require('passport');
const {register, verifyEmail, forgotPassword,resetPassword, login, verifyOTP,  getEmployerDetails, verifyPhone, sendPhoneOtp} =  require('../controllers/EmployerAuthController.js');


const router = express.Router();

//Register
router.post('/register', register);

//Verify otp
router.post('/verify-otp', verifyOTP);

// // // ✅ Send OTP for phone verification
// router.post('/send-phone-otp', protect, sendPhoneOtp)

// // ✅ Verify phone with OTP
// router.post('/verify-phone', protect, verifyPhone)
// Send OTP for phone verification
router.post('/send-phone-otp', sendPhoneOtp);

// Verify phone with OTP
router.post('/verify-phone', verifyPhone);

//get employer
router.get("/employerdetails/:id", getEmployerDetails)

//login
router.post('/login', login)

//email veriification
router.get('/verify-email/:token', verifyEmail)

//Forget password
router.post('/forgot-password', forgotPassword);

//Reset password
router.post('/reset-password/:token', resetPassword);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), (req, res) => res.redirect('/dashboard'));

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => res.redirect('/dashboard'));

router.get('/linkedin', passport.authenticate('linkedin'));
router.get('/linkedin/callback', passport.authenticate('linkedin'), (req, res) => res.redirect('/dashboard'));

module.exports = router;