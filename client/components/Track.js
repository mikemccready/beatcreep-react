// Track.js
import React from 'react';

export default function Track(props) {
	const title = props.trackData.title.replace(/&amp;/g, '&');
	const genre = props.trackData.genre;
	const artist = props.trackData.artist.toUpperCase().replace(/&AMP;/g, '&');

	return (
	<div>
		{artist}  <span className="genre">{genre}</span>{props.trackData.charted}
    	<h5>{title}</h5>
	</div>
	)
}
