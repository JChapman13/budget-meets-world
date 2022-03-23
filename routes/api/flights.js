const express = require('express')
const router = express.Router()
const flightsCtrl = require('../../controllers/api/flights')

router.get('/', flightsCtrl.getFlights)


router.post('/city', flightsCtrl.getCityCode)

module.exports = router;