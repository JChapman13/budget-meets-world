const UserModel = require('../../models/User.js');
const axios = require('axios');
require('dotenv').config();

module.exports = {
	getFlights,
	getCityCode,
};

async function getFlights(req, res) {
	console.log(req.query);
	axios
		.get(
			`https://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/${req.query.country}/${req.query.currency}/${req.query.locale}/${req.query.originPlace}/${req.query.destinationPlace}/${req.query.outboundPartialDate}/${req.query.inboundPartialDate}?apiKey=${process.env.FLIGHT_API}`
		)
		.then((data) => {
			res.status(200).json(data.data);
		})
		.catch((err) => console.log(err), 'API call error');
}

async function getCityCode(req, res) {
	axios
		.get(
			`https://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/usd/en-US?query=${req.body.city}&apikey=${process.env.FLIGHT_API}`
		)
		.then((data) => {
			let city;
			if (data.data.Places.length == 0) {
				city = 'anywhere';
			} else {
				city = data.data.Places[0].CityId;
			}
			res.status(200).json(city);
		})
		.catch((err) => console.log(err), 'API call error');
}
