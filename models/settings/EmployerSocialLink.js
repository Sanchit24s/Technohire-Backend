const mongoose = require("mongoose");

const SocialMediaLinksSchema = new mongoose.Schema({
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employer",
        required: true
    },
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("SocialMediaLinks", SocialMediaLinksSchema);
