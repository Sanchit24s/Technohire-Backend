const Company = require("../models/companyInfoModel");

const addCompany = async (req, res) => {
  try {
    const { name, foundedIn, orgType, teamSize, location, aboutUs } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const profilePic = req.file.path;

    if (
      !profilePic ||
      !name ||
      !foundedIn ||
      !orgType ||
      !teamSize ||
      !location ||
      !aboutUs
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCompany = new Company({
      profilePic,
      name,
      foundedIn,
      orgType,
      teamSize,
      location,
      aboutUs,
    });
    await newCompany.save();

    res
      .status(201)
      .json({ message: "Company added successfully", company: newCompany });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addCompany };
