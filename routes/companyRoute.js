const express = require("express");
const router = express.Router();
const {
    createCompany,
    updateCompany,
    getAllCompanies,
    getCompany,
    deleteCompany,
} = require("../controllers/companyInfoController");
const { protect } = require("../middlewares/EmployerAuthMiddleware");
const upload = require("../middlewares/multer.js");
const {
    createFoundingInfo,
    getFoundingInfo,
    updateFoundingInfo,
    deleteFoundingInfo,
} = require("../controllers/foundingInfoController");
const { getAllCompaniesCount } = require("../controllers/companyInfoController");

// Founding Info Routes
router.post("/foundingInfo", createFoundingInfo);
router.get("/foundingInfo", getFoundingInfo);
router.put("/foundingInfo/:id", updateFoundingInfo);
router.delete("/foundingInfo/:id", deleteFoundingInfo);

// Company Info Routes (Upload)
router.post(
    "/",
    protect,
    upload.fields([{ name: "logo" }, { name: "bannerImage" }]),
    createCompany
);

router.put(
    "/:id",
    protect,
    upload.fields([{ name: "logo" }, { name: "bannerImage" }]),
    updateCompany
);

router.get("/", getAllCompanies);
router.get("/:id", getCompany);
router.delete("/:id", deleteCompany);

router.get("/companyInfo/:id", getCompany);

router.delete("/companyInfo/:id", deleteCompany);

router.get("/companiesCount", getAllCompaniesCount);

module.exports = router;
