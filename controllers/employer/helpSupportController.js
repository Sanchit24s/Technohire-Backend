const helpSupportService = require('../../services/employer/helpSupportService');

exports.getFAQs = async (req, res) => {
    try {
        const faqs = await helpSupportService.getFAQs();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createFAQ = async (req, res) => {
    try {
        const faq = await helpSupportService.createFAQ(req.body);
        res.status(201).json(faq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateFAQ = async (req, res) => {
    try {
        const faq = await helpSupportService.updateFAQ(req.params.id, req.body);
        res.status(200).json(faq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getContactMethods = async (req, res) => {
    try {
        const contacts = await helpSupportService.getContactMethods();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createContactMethod = async (req, res) => {
    try {
        const contact = await helpSupportService.createContactMethod(req.body);
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateContactMethod = async (req, res) => {
    try {
        const contact = await helpSupportService.updateContactMethod(req.params.id, req.body);
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
