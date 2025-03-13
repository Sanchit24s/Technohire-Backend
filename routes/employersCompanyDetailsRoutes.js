const express = require("express");
const { addCompany } = require("../controllers/employersCompanyDetailsController");
const { upload } = require("../utils/cloudinary");

const router = express.Router();

router.post("/add", upload.single("profilePic"), addCompany);

module.exports = router;
