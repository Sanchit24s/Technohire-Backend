const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userRefId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // have to change user model name accordingly(arya) 
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    experience: { type: Number, required: true, min: 0 },
    education: { type: String, required: true, trim: true },
    appliedDate: { type: Date, default: Date.now },
    shortlisted: { type: Boolean, default: false },
    profileImage: { type: String, trim: true },
    resumeUrl: { type: String, trim: true }
},

{ timestamps: true } 

);

module.exports = mongoose.model("Application", applicationSchema);

