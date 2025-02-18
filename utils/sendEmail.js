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

// Send verification email
const sendVerificationEmail = async (user, res) => {
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
        res.status(200).json({ msg: "Verification email sent. Check your inbox." });
    } catch (error) {
        console.error("Error Sending Verification Email:", error);
        res
            .status(500)
            .json({
                msg: "Failed to send verification email.",
                error: error.message,
            });
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

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail,
};
