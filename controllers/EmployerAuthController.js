const Employer = require('../models/Employer.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendPasswordResetEmail, sendVerificationEmail, sendOTPEmail } = require('../utils/sendEmail.js');
const { sendOtp, verifyOTP } = require('../utils/sendPhoneOTP.js');
require('dotenv').config();

/* ===========================
        AUTHENTICATION
=========================== */

// Register Employer
exports.register = async (req, res) => {
    try {
        const { fullName, userName, email, password } = req.body;

        // Validate fields before proceeding
        if (!fullName || !userName || !email || !password) {
            return res.status(400).json({ msg: "All fields are required." });
        }

        // Check if employer already exists
        let employer = await Employer.findOne({ email });
        if (employer) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new employer
        employer = new Employer({
            fullName,
            userName,
            email,
            password: hashedPassword,
        });

        await employer.save();

        // Generate JWT Token
        const token = jwt.sign(
            { id: employer._id, email: employer.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            msg: "Registration successful! Please verify your account.",
            userId: employer._id,
            fullName: employer.fullName,
            userName: employer.userName,
            email: employer.email,
            token,
        });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Employer Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const employer = await Employer.findOne({ email });
        if (!employer) return res.status(400).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, employer.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign(
            { id: employer._id, email: employer.email },
            process.env.JWT_SECRET,
            { expiresIn: '1y' }
        );

        res.status(200).json({ userId: employer._id, token });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

/* ===========================
      EMAIL VERIFICATION
=========================== */

// Send Email Verification OTP
exports.sendEmailVerificationOTP = async (req, res) => {
    const { email } = req.body;

    try {
        const employer = await Employer.findOne({ email });
        if (!employer) {
            return res.status(400).json({ msg: "No user found with this email." });
        }

        // Send verification email
        const verificationResult = await sendVerificationEmail(employer);
        if (!verificationResult.success) {
            return res.status(500).json({ msg: verificationResult.message });
        }

        res.status(200).json({ msg: "Verification email sent. Check your inbox." });
    } catch (error) {
        console.error("Error in sendEmailVerificationOTP:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Verify Email OTP
exports.verifyEmailOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const employer = await Employer.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
        if (!employer) return res.status(400).json({ msg: 'Invalid or expired OTP' });

        employer.isVerified = true;
        employer.otp = undefined;
        employer.otpExpires = undefined;
        await employer.save();

        res.status(200).json({ msg: 'Email verified successfully.' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

/* ===========================
      PHONE VERIFICATION
=========================== */

// Send Phone OTP
exports.sendPhoneOtp = async (req, res) => {
    const { phone } = req.body;

    try {
        const employer = await Employer.findById(req.user.id);
        if (!employer) return res.status(400).json({ msg: 'No user found with this phone number' });

        const otpResult = await sendOtp(phone);
        if (!otpResult.success) {
            return res.status(500).json({ msg: otpResult.message });
        }

        res.status(200).json({ msg: 'OTP sent to your phone.', verificationSid: otpResult.verificationSid });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Verify Phone OTP
exports.verifyPhone = async (req, res) => {
    const { phone, code } = req.body;

    try {
        const employer = await Employer.findById(req.user.id);
        if (!employer) return res.status(400).json({ msg: 'No user found with this phone number' });

        const verificationResult = await verifyOTP(phone, code);
        if (!verificationResult.success) {
            return res.status(500).json({ msg: verificationResult.message });
        }

        if (verificationResult.status === 'approved') {
            employer.phoneVerified = true;
            employer.phone = phone;
            await employer.save();
            res.status(200).json({ msg: 'Phone number verified successfully.' });
        } else {
            res.status(400).json({ msg: 'Invalid or expired OTP' });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

/* ===========================
        PASSWORD RESET
=========================== */

// Forgot Password
// Forgot Password
// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const employer = await Employer.findOne({ email });
        if (!employer) {
            return res.status(400).json({ msg: "No user found with this email." });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        employer.resetPasswordToken = resetToken;
        employer.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
        await employer.save();

        // Send reset password email
        const resetUrl = `${process.env.BASE_URL}/employer/auth/reset-password/${resetToken}`; // Correct reset URL
        const emailResult = await sendPasswordResetEmail(email, resetUrl);
        if (!emailResult.success) {
            return res.status(500).json({ msg: emailResult.message });
        }

        res.status(200).json({ msg: "Password reset email sent. Check your inbox." });
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
// Reset Password
// Reset Password
// Reset Password
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const employer = await Employer.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Check if token is not expired
        });

        if (!employer) {
            return res.status(400).json({ msg: "Invalid or expired token." });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        employer.password = hashedPassword;
        employer.resetPasswordToken = undefined;
        employer.resetPasswordExpires = undefined;
        await employer.save();

        res.status(200).json({ msg: "Password reset successful." });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
/* ===========================
        EMPLOYER DETAILS
=========================== */

// Get Employer Details
exports.getEmployerDetails = async (req, res) => {
    try {
        const employerdetails = await Employer.findById(req.params.id);

        if (!employerdetails) {
            return res.status(404).json({ msg: "Employer profile not found" });
        }

        res.status(200).json({ employerdetails });
    } catch (error) {
        console.error("Error fetching Employer Profile:", error);
        res.status(500).json({ msg: error.message });
    }
};