const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const app = express()
const http = require('http')
const server = http.createServer(app)
require('dotenv').config()
require('./config/database')

app.use(logger('dev'))
app.use(express.json())

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api/flights', require('./routes/api/flights.js'))
app.use('/api/hotels', require('./routes/api/hotels.js'))
app.use('/api/foods', require('./routes/api/foods.js'))
app.use('/api/users', require('./routes/api/users.js'))

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const port = process.env.PORT || 3001;

server.listen(port, function() {
    console.log(`Express app running on port ${port}`)
});