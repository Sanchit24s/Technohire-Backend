const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

const client = twilio(accountSid, authToken);

const sendOtp = async (phoneNumber) => {
    try {
        const verification = await client.verify.v2
            .services(serviceSid)
            .verifications.create({
                to: phoneNumber,
                channel: 'sms',
            });

        return { success: true, message: 'OTP sent successfully.', verificationSid: verification.sid };
    } catch (error) {
        console.error('Error sending OTP via SMS:', error);
        return { success: false, message: 'Failed to send OTP via SMS.', error: error.message };
    }
};

// Verify OTP
const verifyOTP = async (phoneNumber, code) => {
    try {
        const verificationCheck = await client.verify.v2
            .services(serviceSid)
            .verificationChecks.create({
                to: phoneNumber,
                code: code,
            });

        return { success: true, status: verificationCheck.status };
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return { success: false, message: 'Failed to verify OTP.', error: error.message };
    }
};

module.exports = {
    sendOtp,
    verifyOTP,
};