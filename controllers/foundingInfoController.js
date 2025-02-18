const FoundingInfo = require("../models/foundingInfoModel");

// Create Founding Info
const createFoundingInfo = async (req, res) => {
    try {
        const foundingInfo = new FoundingInfo(req.body);
        await foundingInfo.save();
        res
            .status(201)
            .json({ message: "Founding Info created successfully", foundingInfo });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error creating Founding Info", error: error.message });
    }
};

// Get All Founding Info
const getFoundingInfo = async (req, res) => {
    try {
        const data = await FoundingInfo.find();
        res.status(200).json(data);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching Founding Info", error: error.message });
    }
};

// Update Founding Info
const updateFoundingInfo = async (req, res) => {
    try {
        const updatedData = await FoundingInfo.findByIdAndUpdate(
            req.params.id,
            { $set: { ...req.body } },
            { new: true }
        );
        if (!updatedData)
            return res.status(404).json({ message: "Founding Info not found" });
        res.status(200).json({ message: "Updated successfully", updatedData });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error updating Founding Info", error: error.message });
    }
};

// Delete Founding Info
const deleteFoundingInfo = async (req, res) => {
    try {
        const deletedData = await FoundingInfo.findByIdAndDelete(req.params.id);
        if (!deletedData)
            return res.status(404).json({ message: "Founding Info not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error deleting Founding Info", error: error.message });
    }
};

module.exports = {
    createFoundingInfo,
    getFoundingInfo,
    updateFoundingInfo,
    deleteFoundingInfo,
};
