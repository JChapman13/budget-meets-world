const UserModel = require('../../models/User.js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

module.exports = {
    login,
    signup,
    getOne,
    getAll,
    createTrip,
    editTrip,
    getTrip,
}

async function login(req, res) {
    try {
        const user = await UserModel.findOne({name: req.body.name})
        if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error();
        const token = jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'})
        res.status(200).json(token)
    } catch(err) {
        res.status(400).json(err)
    }
}


async function signup(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS))
        const user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        const token = jwt.sign({user}, process.env.SECRET, { expiresIn: '24h' })
        res.status(200).json(token)
    } catch(err) {
        res.status(400).json(err)
    }
}


async function getOne(req,res){
    try {
        let userId = req.get('userId')
        const user = await UserModel.findById(userId)
        res.status(200).json(user)
    } catch(err) {
        res.status(400).json(err)
    }
}


async function getAll(req,res){
    try {
        const users = await UserModel.find({}).select('email');
        res.status(200).json(users)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function createTrip(req,res){
    let userId = req.get('userId')
    const users = await UserModel.findById(userId)
    try {
        await users.trip.push(req.body)
        await users.save()
        const theTrip = await users.trip.find(trip => trip.name == req.body.name )
        res.status(200).json({ users: users, trip: theTrip })
    } catch(err) {
        res.status(400).json(err)
    }
}

async function editTrip(req,res){
    let userId = req.get('userId')
    const users = await UserModel.findById(userId)
    let tripId = req.get('tripId')
    try {
        let popedTrip = await users.trip.splice(users.trip.indexOf(trip => {
            trip._id === tripId
        }), 1)
        req.body.hotel = popedTrip.hotel
        await users.trip.push(req.body)
        await users.save()
        const theTrip = await users.trip.find(trip => trip.name == req.body.name )
        res.status(200).json({ users: users, trip: theTrip })
    } catch(err) {
        res.status(400).json(err)
    }
}

async function getTrip(req, res) {
    try {
        let userId = req.get('userId')
        const users = await UserModel.findById(userId)
        let tripId = req.get('tripId')
        const theTrip = await users.trip.find(trip => trip._id == tripId )
        res.status(200).json(theTrip)
    } catch(err) {
        res.status(400).json(err)
    }
}