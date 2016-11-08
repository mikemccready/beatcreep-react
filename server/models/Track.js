// Track.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// track schema
const trackSchema = new Schema({
	title: String,
	artist: String,
	genre: String,
	plays: { type: Number, default: 0 },
	favorited: { type: Boolean, default: false },
	source: String,
	created_at: { type: Date, default: Date.now }
});

// init model with schema
const Track = mongoose.model('Track', trackSchema);

module.exports = Track;