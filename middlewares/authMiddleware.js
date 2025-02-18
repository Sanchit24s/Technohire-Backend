const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

exports.protect = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        console.log("Token:", token); // Log the token for debugging

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Access Denied: No token provided" });
        }

        token = token.split(" ")[1];
        console.log("Token after split:", token); // Log the token for debugging

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:", decoded); // Log the decoded payload for debugging

        const user = await User.findById(decoded.id).select("-password");
        if (!user)
            return res.status(401).json({ msg: "Access Denied: Invalid User" });

        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification error:", error); // Log the error for debugging
        res.status(401).json({ msg: "Invalid token!" });
    }
};
