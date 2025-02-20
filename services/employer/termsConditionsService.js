const TermsConditions = require('../../models/employer/TermsConditions');

exports.getTermsConditions = async () => {
    return await TermsConditions.find();
};

exports.createTermsCondition = async (termsData) => {
    const terms = new TermsConditions(termsData);
    await terms.save();
    return terms;
};

exports.updateTermsCondition = async (id, termsData) => {
    return await TermsConditions.findByIdAndUpdate(id, termsData, { new: true });
};
