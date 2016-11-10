// Track.js
import React from 'react';

export default function Track(props) {
	const title = props.trackData.title.replace(/&amp;/g, '&');
	const genre = props.trackData.genre;
	const artist = props.trackData.artist.toUpperCase().replace(/&AMP;/g, '&');
	let id = 'inactive'

	if (props.nowPlayingId === props.trackData._id) {
		id = 'playing'
	}

	return (
		<div id={id} className="track">
			{artist}  <span className="genre">{genre}</span>
	    <h5 onClick={(e) => {props.loadPlayer(e, props.trackData)}}>{title}</h5>
		</div>
	)
}
