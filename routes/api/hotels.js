const express = require("express");
const router = express.Router();
const hotelsCtrl = require("../../controllers/api/hotels");

router.post('/', hotelsCtrl.getHotels)
router.post('/one', hotelsCtrl.getOne)
router.get('/photos', hotelsCtrl.getPhotos)

module.exports = router;
