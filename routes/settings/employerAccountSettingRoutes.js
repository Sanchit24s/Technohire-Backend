const express = require("express");
const router = express.Router();
const {
  createAccountSettings,
  updateSettings,
  getAccountSetting,
  deleteSettings,
  changePassword,
} = require("../../controllers/settings/employerAccountSettingController");
const { protect } = require("../../middlewares/EmployerAuthMiddleware");

// Employer Account Settings Routes
router.post("/", protect, createAccountSettings);
router.put("/", protect, updateSettings);
router.get("/", protect, getAccountSetting);
router.delete("/", protect, deleteSettings);
router.put("/change-password", protect, changePassword);

module.exports = router;
