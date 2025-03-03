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

const sendVerificationEmail = async (user) => {
    try {
        const verificationToken = crypto.randomBytes(32).toString("hex");
        user.verificationToken = verificationToken;
        await user.save(); // Save the token

        const verificationUrl = `${process.env.BASE_URL}/auth/verify-email/${verificationToken}`;

        const mailOptions = {
            from: `"Your Company" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Email Verification Required",
            html: `
                <p>Hello ${user.fullName},</p>
                <p>Click the link below to verify your email:</p>
                <a href="${verificationUrl}">${verificationUrl}</a>
                <p>This link will expire after some time.</p>
            `,
        };

        await transport.sendMail(mailOptions);
        return { success: true, message: "Verification email sent. Check your inbox." };
    } catch (error) {
        console.error("Error Sending Verification Email:", error);
        return { success: false, message: "Failed to send verification email.", error: error.message };
    }
};

// Send password reset email
const sendPasswordResetEmail = async (user, res) => {
    try {
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();

        const resetUrl = `${process.env.BASE_URL}/auth/reset-password/${resetToken}`;

        const mailOptions = {
            from: `"Your Company" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Password Reset Request",
            html: `
                <p>Hello ${user.fullName},</p>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>This link will expire in 1 hour.</p>
            `,
        };

        await transport.sendMail(mailOptions);
        res
            .status(200)
            .json({ msg: "Password reset email sent. Check your inbox." });
    } catch (error) {
        console.error("Error Sending Password Reset Email:", error);
        res
            .status(500)
            .json({
                msg: "Failed to send password reset email.",
                error: error.message,
            });
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