const express = require('express')
const router = express.Router()
const foodsCtrl = require('../../controllers/api/foods')

router.get('/', foodsCtrl.getFoods)

module.exports = router;