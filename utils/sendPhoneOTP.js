const twilio = require('twilio')
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid,authToken);

const sendPhoneOtp = async(phoneNumber,otp) => {
    try {
        const message = await client.messages.create({
            body: `Your OTP For verfication is : ${otp}`,
            from: twilioPhoneNumber,
            to: phoneNumber
        });
        console.log("OTP sent via SMS:", message.sid)
        return { success: true, message: "OTP sent successfully." };
    } catch (error) {
        console.error('Error sending OPT via SMS:', error);
        return {success: false, message: "Failed to send OTP via SMS.", error: error.message}
    }
}

module.exports = {
    sendPhoneOtp
}