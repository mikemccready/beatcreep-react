// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// database connections
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beatcreep-react');
mongoose.connection.once('open', () => {
  console.log('connected to mongodb');
});

// middleware
app.use(bodyParser.json());

// serve index at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + './../index.html'));
});

// track api routes
app.get('/api/tracks', (req, res) => {
	console.log(req.body)
});

app.post('/api/tracks', (req, res) => {

});


// start server
app.listen(PORT, () => {
	console.log('server listening on port ', PORT)
})

module.exports = app;