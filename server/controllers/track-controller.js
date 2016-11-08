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

		res.setHeader('Content-Type', 'application/json');
		res.status(200);
		return res.send(JSON.stringify(track));
	})

}

trackController.getTracks = (req, res) => {
	console.log('getTracks', req.body)
}

module.exports = trackController;