const FAQ = require('../../models/employer/FAQ');
const ContactUs = require('../../models/employer/ContactUs');

exports.getFAQs = async () => {
    return await FAQ.find();
};

exports.createFAQ = async (faqData) => {
    const faq = new FAQ(faqData);
    await faq.save();
    return faq;
};

exports.updateFAQ = async (id, faqData) => {
    return await FAQ.findByIdAndUpdate(id, faqData, { new: true });
};

exports.getContactMethods = async () => {
    return await ContactUs.find();
};

exports.createContactMethod = async (contactData) => {
    const contact = new ContactUs(contactData);
    await contact.save();
    return contact;
};

exports.updateContactMethod = async (id, contactData) => {
    return await ContactUs.findByIdAndUpdate(id, contactData, { new: true });
};
