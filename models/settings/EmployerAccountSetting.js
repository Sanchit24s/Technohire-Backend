const mongoose = require('mongoose');

const EmployerAccountSettingSchema = new mongoose.Schema({
    employerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employer', 
        required: true 
    },
    mapLocation: { type: String, default: "" },
    phone: { type: String, required: true },
    countryCode: { type: String, default: "+91" },
    email: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('EmployerAccountSetting', EmployerAccountSettingSchema);
