const express = require("express");
const upload = require("../middlewares/multer");
const { completeProfile } = require("../controllers/profileController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post(
    "/complete",
    protect,
    upload.fields([{ name: "photo" }, { name: "resume" }]),
    completeProfile
);

module.exports = router;
