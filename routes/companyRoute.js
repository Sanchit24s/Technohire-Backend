const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const {
    createCompany,
    updateCompany,
    getAllCompanies,
    getCompany,
    deleteCompany,
} = require("../controllers/companyInfoController");
const {
    createFoundingInfo,
    getFoundingInfo,
    updateFoundingInfo,
    deleteFoundingInfo,
} = require("../controllers/foundingInfoController");

// Founding Info Routes
router.post("/foundingInfo", createFoundingInfo);
router.get("/foundingInfo", getFoundingInfo);
router.put("/foundingInfo/:id", updateFoundingInfo);
router.delete("/foundingInfo/:id", deleteFoundingInfo);

// Company Info Routes (Upload)
router.post(
    "/companyInfo",
    upload.fields([{ name: "logo" }, { name: "bannerImage" }]),
    createCompany
);

router.put(
    "/companyInfo/:id",
    upload.fields([{ name: "logo" }, { name: "bannerImage" }]),
    updateCompany
);

router.get("/companyInfo", getAllCompanies);

router.get("/companyInfo/:id", getCompany);

router.delete("/companyInfo/:id", deleteCompany);

module.exports = router;
