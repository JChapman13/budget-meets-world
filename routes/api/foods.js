const express = require("express");
const router = express.Router();
const foodsCtrl = require("../../controllers/api/foods");

router.get("/", foodsCtrl.getFoods);
router.get("/location", foodsCtrl.getCoordinates);
router.get("/detail/:id", foodsCtrl.restaurantDetail);

module.exports = router;
