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
        console.log('Token after split:', token); // Log the token for debugging

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT:", decoded); // Log the decoded payload for debugging

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
