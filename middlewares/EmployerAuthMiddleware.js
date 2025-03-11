const jwt = require('jsonwebtoken');
const Employer = require('../models/Employer.js');
require('dotenv').config();

exports.protect = async (req, res, next) => {
    try {
        let token = req.header('Authorization');

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'Access Denied: No token provided' });
        }

        token = token.split(' ')[1];

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not set in environment variables');
            return res.status(500).json({ msg: 'Internal Server Error: JWT_SECRET not configured' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const employer = await Employer.findById(decoded.id).select('-password');

        if (!employer) {
            return res.status(401).json({ msg: 'Access Denied: Invalid Employer' });
        }

        req.user = employer; // Store employer info in req.user
        next();
    } catch (error) {
        console.error('Authentication Error:', error); // Log the error for debugging
        res.status(401).json({ msg: 'Authentication failed!' });
    }
};

// ✅ Middleware to check phone verification
exports.requirePhoneVerification = async (req, res, next) => {
    if (!req.employer.phoneVerified) {
        return res.status(403).json({ message: 'Phone number is not verified' });
    }
    next();
};