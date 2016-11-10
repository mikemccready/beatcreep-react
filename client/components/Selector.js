// Selector.js
import React from 'react';

export default function Selector(props) {
	const genres = [];

	for (let genre in props.genres) {
		console.log(genre)
		genres.push(genre);
	}

	const genreElems = genres.map((genre, i) => {
		return <div key={i} className="genre-menu-item">{genre}</div>
	});

	return (
		<div>
			<div>{props.selected}</div>
			<div className="genre-menu" onClick={(e) => {props.selectGenre(e)}}>
				<div className="genre-menu-item">All genres</div>
				{genreElems}
			</div>
		</div>
	)
}