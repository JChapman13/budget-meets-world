const UserModel = require("../../models/User.js");
const axios = require("axios");
require("dotenv").config();

module.exports = {
  getFoods,
  restaurantDetail,
  saveRestaurant,
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
async function saveRestaurant(req, res) {
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { restaurantIds: req.body },
      },
      { returnDocument: "after" }
    );
    const token = jwt.sign({ user: user }, process.env.SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json(token);
  } catch {
    console.log("user delete error", err);
    res.status(400).json(err);
  }
}

async function saveRestaurant(req, res) {
  console.log(req.body);
  // try {
  // user.updateOne(
  //     {"_id": 1 },
  //     { "$push": {"trip.$.hotel": req.body } }
  // )
  //   const user = await UserModel.findById(req.body.userId);
  //   const trip = await user.trip.find((trip) => trip._id == req.body.tripId);
  //   await trip.hotel.push({ id: req.body. });
  //   await trip.save();
  //   await user.save();
  //   res.status(200).json({ user: user, trip: trip });
  // } catch (err) {
  //   res.status(400).json(err);
  // }
}
