const express = require("express");
const { createTerms, getLatestTerms, updateTerms } = require("../controllers/termsConditionController");

const router = express.Router();

//terms and conditions 
router.post("/createTerms", createTerms);
router.get("/latestTerms", getLatestTerms);
router.put("/updateTerms/:id", updateTerms);

module.exports = router;