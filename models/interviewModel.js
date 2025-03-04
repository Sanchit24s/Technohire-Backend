const { Schema, model } = require("mongoose");

const interviewSchema = new Schema(
    {
        candidateId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Candidate",
        },
        employerId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Employer",
        },
        jobId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Job",
        },
        rounds: [
            {
                roundNumber: Number,
                date: String,
                time: String,
                status: {
                    type: String,
                    enum: ["Scheduled", "Completed", "Pending"],
                    default: "Pending",
                },
            },
        ],
        currentRound: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
);

const InterviewModel = model("Interview", interviewSchema);
module.exports = InterviewModel;
