// track-controller.js
const Track = require('../models/Track');

let trackController = {};

trackController.saveTrack = (req, res) => {
	let newTrack = new Track();

	newTrack.title = req.body.title;
	newTrack.artist = req.body.artist;
	newTrack.genre = req.body.genre;
	newTrack.source = req.body.source;

	newTrack.save((err, track) => {
		if (err) throw err;
		res.status(200);
		res.setHeader('Content-Type', 'application/json');
		return res.send(JSON.stringify(track)).end();
	})
}

trackController.getTracks = (req, res) => {
	Track.find({}, (err, tracks) => {
		if (err) throw err;
		res.status(200);
		res.setHeader('Content-Type', 'application/json');
		return res.send(tracks).end();
	})
}

module.exports = trackController;