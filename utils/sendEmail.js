const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

// Create NodeMailer Transporter
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Send Verification Email
const sendVerificationEmail = async (user) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
        user.otp = otp;
        user.otpExpires = Date.now() + 3600000; // OTP valid for 1 hour
        await user.save();

        const mailOptions = {
            from: `"Your Company" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Email Verification OTP",
            html: `
                <p>Hello ${user.fullName},</p>
                <p>Your OTP for email verification is: <strong>${otp}</strong></p>
                <p>This OTP will expire in 1 hour.</p>
            `,
        };

        await transport.sendMail(mailOptions);
        return { success: true, message: "Verification email sent. Check your inbox." };
    } catch (error) {
        console.error("Error Sending Verification Email:", error);
        return { success: false, message: "Failed to send verification email.", error: error.message };
    }
};

// Send Password Reset Email
// Send Password Reset Email
// Send Password Reset Email
const sendPasswordResetEmail = async (email, resetUrl) => {
    try {
        const mailOptions = {
            from: `"Your Company" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset Request",
            html: `
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>This link will expire in 1 hour.</p>
            `,
        };

        await transport.sendMail(mailOptions);
        return { success: true, message: "Password reset email sent. Check your inbox." };
    } catch (error) {
        console.error("Error Sending Password Reset Email:", error);
        return { success: false, message: "Failed to send password reset email.", error: error.message };
    }
};
const sendOTPEmail = async (user) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
        user.otp = otp;
        user.otpExpires = Date.now() + 3600000; // OTP valid for 1 hour
        await user.save();

        const mailOptions = {
            from: `"Your Company" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Your OTP for Verification",
            html: `
                <p>Hello ${user.fullName},</p>
                <p>Your OTP is: <strong>${otp}</strong></p>
                <p>This OTP will expire in 1 hour.</p>
            `,
        };

        await transport.sendMail(mailOptions);
        return { success: true, message: "OTP email sent. Check your inbox." };
    } catch (error) {
        console.error("Error Sending OTP Email:", error);
        return { success: false, message: "Failed to send OTP email.", error: error.message };
    }
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail,
    sendOTPEmail
};