
const Employer = require('../models/Employer.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendPasswordResetEmail, sendVerificationEmail , sendOTPEmail} = require('../utils/sendEmail.js');
const {sendOtp, verifyOTP} = require('../utils/sendPhoneOTP.js')
require('dotenv').config();

exports.register = async (req, res) => {
    const { companyName, email, password, phone } = req.body;

    try {
        let employer = await Employer.findOne({ email });
        if (employer) return res.status(400).json({ msg: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        employer = new Employer({ companyName, email, password: hashedPassword, phone });

        // Save the employer to the database
        await employer.save();
         // // Send verification email
        // const verificationResult = await sendVerificationEmail(employer);
        // if (!verificationResult.success) {
        //     return res.status(500).json({ msg: verificationResult.message });
        // }

        // Send OTP to phone
        const otpPhoneResult = await sendOtp(employer);
        if (!otpPhoneResult.success) {
            return res.status(500).json({ msg: otpPhoneResult.message });
        }

        // Send a single response
        res.status(200).json({ msg: 'Employer registered successfully. Check your phone for OTP.' });
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({ msg: error.message });
    }
};
// Get Employer Profile
exports.getEmployerDetails = async (req, res) => {
    try {
        console.log("Fetching Employer Profile with ID:", req.params.id);
        const employerdetails = await Employer.findById(req.params.id);
        
        if (!employerdetails) {
            console.log("Employer Profile not found");
            return res.status(404).json({ msg: "Employer profile not found" });
        }

        console.log("Employer Profile found:", employerdetails);
        res.status(200).json({ employerdetails });
    } catch (error) {
        console.error("Error fetching Employer Profile:", error);
        res.status(500).json({ msg: error.message });
    }
};

// Send OTP to phone
exports.sendPhoneOtp = async (req, res) => {
    const { phone } = req.body;

    try {
        const employer = await Employer.findOne({ phone });
        if (!employer) return res.status(400).json({ msg: 'No user found with this phone number' });

        const otpResult = await sendOTP(phone);
        if (!otpResult.success) {
            return res.status(500).json({ msg: otpResult.message });
        }

        res.status(200).json({ msg: 'OTP sent to your phone.', verificationSid: otpResult.verificationSid });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Verify phone OTP
exports.verifyPhone = async (req, res) => {
    const { phone, code } = req.body;

    try {
        const employer = await Employer.findOne({ phone });
        if (!employer) return res.status(400).json({ msg: 'No user found with this phone number' });

        const verificationResult = await verifyOTP(phone, code);
        if (!verificationResult.success) {
            return res.status(500).json({ msg: verificationResult.message });
        }

        if (verificationResult.status === 'approved') {
            employer.phoneVerified = true;
            await employer.save();
            res.status(200).json({ msg: 'Phone number verified successfully.' });
        } else {
            res.status(400).json({ msg: 'Invalid or expired OTP' });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
// Verify OTP
exports.verifyOTP = async (req, res) => {
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

exports.verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const employer = await Employer.findOne({ verificationToken: token });
        if (!employer) return res.status(400).json({ msg: 'Invalid or expired token.' });

        employer.isVerified = true;
        employer.verificationToken = undefined;
        await employer.save();

        res.status(200).json({ msg: 'Email verified.' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const employer = await Employer.findOne({ email });
        if (!employer) return res.status(400).json({ msg: 'No user found with this email' });

        const resetToken = crypto.randomBytes(32).toString('hex');
        employer.resetPasswordToken = resetToken;
        employer.resetPasswordExpires = Date.now() + 3600000;
        await employer.save();

        sendPasswordResetEmail(employer, res);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const employer = await Employer.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!employer) return res.status(400).json({ msg: 'Invalid or expired token' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        employer.password = hashedPassword;
        employer.resetPasswordToken = undefined;
        employer.resetPasswordExpires = undefined;
        await employer.save();

        res.status(200).json({ msg: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

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
            { expiresIn: '1h' }
        );

        res.status(200).json({ userId: employer._id, token });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
