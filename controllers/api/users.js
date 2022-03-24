const UserModel = require('../../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');
// const fetch = require("node-fetch");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require('axios').default;

module.exports = {
	login,
	signup,
	getOne,
	getAll,
	createTrip,
	editTrip,
	getTrip,
	saveHotel,
};

async function login(req, res) {
	try {
		const user = await UserModel.findOne({ name: req.body.name });
		if (!(await bcrypt.compare(req.body.password, user.password)))
			throw new Error();
		const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
		res.status(200).json(token);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function signup(req, res) {
	try {
		const hashedPassword = await bcrypt.hash(
			req.body.password,
			parseInt(process.env.SALT_ROUNDS)
		);
		const user = await UserModel.create({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		});
		const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
		res.status(200).json(token);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function getOne(req, res) {
	try {
		let userId = req.get('userId');
		const user = await UserModel.findById(userId);
		res.status(200).json(user);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function getAll(req, res) {
	try {
		const users = await UserModel.find({}).select('email');
		res.status(200).json(users);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function createTrip(req,res){
    let userId = req.get('userId')
    const users = await UserModel.findById(userId)
    try {
        console.log(req.body)
        await users.trip.push(req.body)
        await users.save()
        const theTrip = await users.trip.find(trip => trip.name == req.body.name )
        res.status(200).json({ users: users, trip: theTrip })
    } catch(err) {
        res.status(400).json(err)
    }
}

async function editTrip(req, res) {
	let userId = req.get('userId');
	const users = await UserModel.findById(userId);
	let tripId = req.get('tripId');
	try {
		let popedTrip = await users.trip.splice(
			users.trip.indexOf((trip) => {
				trip._id === tripId;
			}),
			1
		);
		req.body.hotel = popedTrip.hotel;
		await users.trip.push(req.body);
		await users.save();
		const theTrip = await users.trip.find((trip) => trip.name == req.body.name);
		res.status(200).json({ users: users, trip: theTrip });
	} catch (err) {
		res.status(400).json(err);
	}
}

async function getTrip(req, res) {
    try {
        let userId = req.get('userId')
        const users = await UserModel.findById(userId)
        let tripId = req.get('tripId')
        const theTrip = await users.trip.find(trip => trip._id == tripId )
        let startDate = moment(theTrip.startDate).format('YYYY-MM-DD');
        let endDate = moment(theTrip.startDate).format('YYYY-MM-DD');
		async function lala() {
			let hotelArr = []
			for (const file of theTrip.hotel) {
				let fetchHotel = await fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=${file.id}&checkIn=${startDate}&checkOut=${endDate}&adults1=${theTrip.people}&currency=CAD&locale=en_US`, {
					method: 'GET',
					headers: {
						'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
						'X-RapidAPI-Key': process.env.X_RapidAPI_Key
					}
				})
				if (!fetchHotel.ok) {
					exit()
				} else {
					let hotel = await fetchHotel.json().then(response => {
						hotelArr.push(response.data)
					})
				}
			}
			return hotelArr
		}
		let hotel = await lala()
		res.status(200).json({theTrip: theTrip, hotelArr: hotel})
    } catch(err) {
        res.status(400).json(err)
    }
}

async function saveHotel(req, res) {
    try {
        const user = await UserModel.findById(req.body.userId)
        const trip = await user.trip.find(trip => trip._id == req.body.tripId)
        await trip.hotel.push({id: req.body.hotelId})
        await trip.save()
        await user.save()
        res.status(200).json({ user: user, trip: trip })
    } catch(err) {
        res.status(400).json(err)
    }
}


async function saveFlight(req, res) {}
