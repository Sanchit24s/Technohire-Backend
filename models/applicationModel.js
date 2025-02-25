const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userRefId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobRefId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    experience: { type: Number, required: true, min: 0 },
    education: { type: String, required: true, trim: true },
    appliedDate: { type: Date, default: Date.now },
    shortlisted: { type: Boolean, default: false },
    profileImage: { type: String, trim: true },
    resumeUrl: { type: String, trim: true },
<<<<<<< HEAD
    screeningStatus: { type: String, enum: ["Pending", "Passed", "Failed"], default: "Pending" },
    interviewScheduled: {type: Boolean, default: false},
    interviewDate: {type: Date}
},

{ timestamps: true } 
=======
  },
>>>>>>> ce0967b (passed user and job id)

  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
