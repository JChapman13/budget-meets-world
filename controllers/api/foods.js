const UserModel = require("../../models/User.js");
const axios = require("axios");
require("dotenv").config();

module.exports = {
  getFoods,
  restaurantDetail,
  getCoordinates,
};

async function getFoods(req, res) {
  console.log(req.query);
  axios
    .get(
      `https://api.yelp.com/v3/businesses/search?term=restaurants&limit=50&latitude=${req.query.latitude}&longitude=${req.query.longitude}`,
      {
        headers: { Authorization: `Bearer ${process.env.YELP_KEY}` },
      }
    )
    .then((data) => {
      console.log(data.data, "this is the data");
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err, "restaurant find error");
      res.status(500).json({ message: "can't find restaurants" });
    });
}

async function restaurantDetail(req, res) {
  axios
    .get(`https://api.yelp.com/v3/businesses/${req.query.id}`, {
      headers: { Authorization: `Bearer ${process.env.YELP_KEY}` },
    })
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err, "restaurant find error");
      res.status(500).json({ message: "can't find restaurant" });
    });
}

async function getCoordinates(req, res) {
  axios
    .get(
      `https://api.geocod.io/v1.7/geocode?q=${req.query.location}&country=CA&api_key=${process.env.REACT_APP_GEO_KEY}`
    )
    .then((data) => {
      res.status(200).json(data.data);
      console.log(data.data, "this is the data");
    })
    .catch((err) => {
      console.log(err, "restaurant find error");
      res.status(500).json({ message: "can't find restaurant" });
    });
}
