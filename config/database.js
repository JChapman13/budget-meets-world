const mongoose = require('mongoose')

<<<<<<< HEAD
// mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

mongoose.connect('mongodb://localhost/tripbudget', {
=======
mongoose.connect(process.env.DATABASE_URL, {
>>>>>>> 42f06f696d4262adfc1eeb74d7ea231b67f3558a
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('connected', function () {
    console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});