const express = require('express')
const router = express.Router()
const {protect} = require('../../middlewares/EmployerAuthMiddleware.js')
const { getSocialLinks, updateSocialLinks , createSocialLinks} = require('../../controllers/settings/EmployerSocialMediaController.js')

router.get("/", protect, getSocialLinks)

router.post("/", protect, createSocialLinks)

router.put("/", protect, updateSocialLinks)

module.exports = router
