const express = require('express')
const router = express.Router()
const hotelsCtrl = require('../../controllers/api/hotels')

router.get('/', hotelsCtrl.getHotels)

module.exports = router;