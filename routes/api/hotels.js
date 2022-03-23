const express = require("express");
const router = express.Router();
const hotelsCtrl = require("../../controllers/api/hotels");

router.post("/", hotelsCtrl.getHotels);

module.exports = router;
