const express = require('express')
const router = express.Router()
const talentPoolController = require('../controllers/TalentPoolController.js')
const {protect} = require('../middlewares/EmployerAuthMiddleware.js')

router.post('/invite',protect ,talentPoolController.inviteToApply)

router.get('/browse',protect,talentPoolController.browseCandidates)

router.post('/filter',protect ,talentPoolController.filterCandidates)

module.exports = router