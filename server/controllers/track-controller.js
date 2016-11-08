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

trackController.getTrackById = (req, res) => {
	Track.findById(req.params.track_id, (err, track) => {
		if (err) throw err;
		res.status(200);
		res.setHeader('Content-Type', 'application/json');
		return res.send(track).end();
	})
}

trackController.updateTrackById = (req, res) => {
	Track.findByIdAndUpdate(req.params.track_id, req.body, {new: true}, (err, track) => {
		if (err) throw err;
		res.status(200);
		res.setHeader('Content-Type', 'application/json');
		return res.send(track).end();		
	})
}

trackController.deleteTrackById = (req, res) => {
	Track.remove({ _id: req.body.id }, (err, data) => {
		if (err) throw err;
		res.status(200);
		return res.send('Track Deleted').end();		
	})
}

module.exports = trackController;




