// track-controller.js
const Track = require('../models/Track');

let trackController = {};

trackController.saveTracksFromScraper = (req, res, trackData) => {
	let filteredTracks = []
	for (let track in trackData) {
		if(trackData[track].charted > 4) {
			filteredTracks.push(trackData[track])
		}
	}

	filteredTracks.forEach((track) => {
		let newTrack = new Track({
			artist: track.artist,
			title: track.title,
			genre: track.genre,
			charted: track.charted,
		})

		newTrack.save((err, newTr) => {
			if (err) return console.err(err);
		})
	})

	return res.end()
}

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
	Track.remove({ _id: req.params.track_id }, (err, data) => {
		if (err) throw err;
		res.status(200);
		return res.send('Track Deleted').end();		
	})
}

module.exports = trackController;




