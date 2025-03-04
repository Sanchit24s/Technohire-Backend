const InterviewModel = require("../models/interviewModel");

const createInterview = async (req, res) => {
    try {
        const { candidateId, employerId, jobId, date, time } = req.body;

        if (!candidateId || !employerId || !jobId || !date || !time) {
            return res
                .status(400)
                .json({ success: false, message: "Provide all fields" });
        }

        const existingInterview = await InterviewModel.exists({
            candidateId,
            employerId,
            jobId,
        });

        if (existingInterview) {
            return res
                .status(400)
                .json({ success: false, message: "Round 1 already scheduled" });
        }

        const interview = new InterviewModel({
            candidateId,
            employerId,
            jobId,
            rounds: [{ roundNumber: 1, date, time, status: "Scheduled" }],
            currentRound: 1,
        });

        await interview.save();

        res.status(201).json({
            success: true,
            message: "Round 1 Scheduled successfully",
            interview,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const markAsCompleted = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Id is missing" });
        }

        const interview = await InterviewModel.findById(id);
        if (!interview) {
            return res
                .status(404)
                .json({ success: false, message: "Interview not found." });
        }

        const currentRound = interview.currentRound;

        // Check if the current round is already the last one
        if (currentRound > 3) {
            return res
                .status(400)
                .json({ success: false, message: "All rounds are completed" });
        }

        // Find the current round object
        const currentRoundObj = interview.rounds.find(
            (round) => round.roundNumber === currentRound
        );

        if (!currentRoundObj) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: `Round ${currentRound} is not scheduled yet.`,
                });
        }

        // Mark the current round as completed
        currentRoundObj.status = "Completed";

        // Advance to the next round
        interview.currentRound = currentRound + 1;

        await interview.save();

        res.status(200).json({
            success: true,
            message: `Round ${currentRound} marked as completed.`,
            interview,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const scheduleNext = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, time } = req.body;

        const interview = await InterviewModel.findById(id);

        if (!interview) {
            return res
                .status(404)
                .json({ success: false, message: "Interview not found" });
        }

        const nextRound = interview.currentRound;

        if (nextRound > 3) {
            return res
                .status(400)
                .json({ success: false, message: "All rounds completed" });
        }

        const previousRound = interview.rounds.find(
            (r) => r.roundNumber === nextRound - 1
        );
        if (previousRound && previousRound.status !== "Completed") {
            return res.status(400).json({
                success: false,
                message: `Round ${previousRound.roundNumber} is not completed yet`,
            });
        }

        // check if the round already exits
        const existingRound = interview.rounds.find(
            (r) => r.roundNumber === nextRound
        );
        if (existingRound) {
            return res.status(400).json({
                success: false,
                message: `Round ${nextRound} is not completed yet`,
            });
        }

        interview.rounds.push({
            roundNumber: nextRound,
            date,
            time,
            status: "Scheduled",
        });

        await interview.save();
        res.status(200).json({
            success: true,
            message: `Round ${nextRound} Scheduled`,
            interview,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { createInterview, markAsCompleted, scheduleNext };
