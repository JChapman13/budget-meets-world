const mongoose = require('mongoose')
const Schema = mongoose.Schema


const saveSchema = new Schema({
    category: String,
    name: String,
    cost: Number,
}, {
    timestamps: true
})

const tripSchema = new Schema({
    name: String,
    budget: Number,
    origin: String,
    destination: String,
    flight: Array,
    accommodation: Array,
    restaurant: Array,
    startDate: Date,
    endDate: Date,
    people: Number,
    save: [saveSchema]
}, {
    timestamps: true
})


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 5,
        required: true
    },
    trip: [tripSchema]
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            return ret
        }
    }
})

let UserModel = mongoose.model('User', userSchema)
module.exports = UserModel