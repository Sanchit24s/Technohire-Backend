const mongoose = require('mongoose');

const ContactUsSchema = new mongoose.Schema({
    method: { type: String, required: true },
    detail: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ContactUs', ContactUsSchema);
