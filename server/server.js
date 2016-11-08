// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beatcreep-react');
mongoose.connection.once('open', () => {
  console.log('connected to mongodb');
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + './../index.html'));
});

app.listen(PORT, () => {
	console.log('server listening on port ', PORT)
})