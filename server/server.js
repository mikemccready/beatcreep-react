// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const webscraper = require('./web-scraper/web-scraper');
const trackController = require('./controllers/track-controller');

const app = express();
const PORT = 3000;

// database connections
const mongoose = require('mongoose');
const config = require('./config');
mongoose.connect(config.mongoURI[app.settings.env], (err) => {
	if (err) {
		console.log('error connecting to mongodb', err);
	} else {
		console.log('connected to mongodb', config.mongoURI[app.settings.env]);
	}
});

// middleware
app.use(bodyParser.json());

// serve index at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + './../index.html'));
});

// web-scraper
app.post('/api/webscraper', webscraper.scrape)

// track api routes
app.get('/api/tracks', trackController.getTracks);
app.post('/api/tracks', trackController.saveTrack);
app.get('/api/track/:track_id', trackController.getTrackById);
app.put('/api/track/:track_id', trackController.updateTrackById);
app.delete('/api/track/:track_id', trackController.deleteTrackById);


// start server
app.listen(PORT, () => {
	console.log('server listening on port ', PORT)
})

module.exports = app;