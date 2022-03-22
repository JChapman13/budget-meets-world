const express = require('express')
const router = express.Router()
const flightsCtrl = require('../../controllers/api/flights')

router.get('/', flightsCtrl.getFlights)

module.exports = router;