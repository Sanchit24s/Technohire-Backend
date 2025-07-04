const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
    sendVerificationEmail,
    sendPasswordResetEmail,
} = require("../utils/sendEmail.js");
require("dotenv").config();

exports.register = async (req, res) => {
    const { fullName, userName, email, password } = req.body;

    console.log("Register request received:", { fullName, userName, email }); // Debugging

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            console.log("User already exists:", email); // Debugging
            return res.status(400).json({ msg: "The email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed successfully"); // Debugging

        // Create a new user
        user = new User({ fullName, userName, email, password: hashedPassword });
        await user.save();
        console.log("User saved successfully:", user); // Debugging

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: "1h" } // Token expiration
        );

        console.log("Token generated successfully"); // Debugging

        // Send verification email (optional)
        await sendVerificationEmail(user, res);

        // Respond with success message and token
        res.status(201).json({
            success: true,
            message: "Registration successful!",
            token: token, // Include the token in the response
            user: {
                id: user._id,
                fullName: user.fullName,
                userName: user.userName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error in register function:", error); // Debugging
        res.status(500).json({ success: false, msg: error.message });
    }
};
// Verify email
exports.verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({ verificationToken: token });
        if (!user)
            return res.status(400).json({ msg: "Invalid or expired token." });

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ msg: "Your email has been verified." });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Forget password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: "No user found with this email" });

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Set token expiry (1 hour from now)
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        // Send password reset email
        sendPasswordResetEmail(user, res);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Check if token is still valid
        });

        if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res
            .status(200)
            .json({ msg: "Password successfully reset. You can now log in." });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Login function
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            userId: user._id,
            tokenId: token,
            bearerToken: `Bearer ${token}`,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Logout function (optional)
exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({ msg: "Logged out successfully" });
};
