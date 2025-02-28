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

module.exports = router;