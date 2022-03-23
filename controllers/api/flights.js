const UserModel = require('../../models/User.js');
const axios = require('axios');
require('dotenv').config();
module.exports = {
	getFlights,
};

async function getFlights(req, res) {
	console.log(req.query);
	axios
		.get(
			`https://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/${req.query.country}/${req.query.currency}/${req.query.locale}/${req.query.originPlace}/${req.query.destinationPlace}/${req.query.outboundPartialDate}/${req.query.inboundPartialDate}?apiKey=${process.env.FLIGHT_API}`
		)
		.then((data) => {
			res.status(200).json(data.data);
			console.log(data);
		})
		.catch((err) => console.log(err), 'API call error');
}
