const SignInSecurity = require('../../models/settings/SignInSecurity.js');

exports.getSignInSecurity = async (userId) => {
    console.log('Fetching sign-in security for userId:', userId);
    const security = await SignInSecurity.findOne({ userId });
    console.log('Sign-in security fetched:', security);
    return security;
};

exports.createSignInSecurity = async (userId, securityData) => {
    console.log('Creating sign-in security for userId:', userId);
    const security = new SignInSecurity({ userId, ...securityData });
    await security.save();
    console.log('Sign-in security created:', security);
    return security;
};

exports.updateSignInSecurity = async (userId, securityData) => {
    console.log('Updating sign-in security for userId:', userId);
    console.log('New security data:', securityData);
    const updatedSecurity = await SignInSecurity.findOneAndUpdate({ userId }, securityData, { new: true });
    console.log('Sign-in security updated:', updatedSecurity);
    return updatedSecurity;
};
