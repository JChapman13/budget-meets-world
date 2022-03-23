const UserModel = require("../../models/User.js");
const axios = require("axios");

module.exports = {
  getFoods,
};

function getFoods(req, res) {
  console.log(req.query);
  axios
    .get(
      `https://api.yelp.com/v3/businesses/search?term=restaurants,${req.query.price}&limit=20&latitude=${req.query.latitude}&longitude=${req.query.longitude}`,
      {
        headers: { Authorization: `Bearer ${process.env.YELP_KEY}` },
      }
    )
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err, "restaurant find error");
      res.status(500).json({ message: "can't find restaurants" });
    });
}
