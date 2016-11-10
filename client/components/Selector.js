// Selector.js
import React from 'react';

export default function Selector(props) {
	
	const genres = [];
	let menuStyle;
	const openStyle = { height: 'auto' };
	const closedStyle = { height: '0' };

	for (let genre in props.genres) {
		genres.push(genre);
	}

	const genreElems = genres.map((genre, i) => {
		return <div key={i} className="genre-menu-item">{genre}</div>
	});

	if (props.menuOpen) {
		menuStyle = openStyle;
	} else {
		menuStyle = closedStyle;
	}

	return (
		<div className="genre-selector">
			<div className="selected-genre" onClick={props.toggleMenu}>{props.selected}</div>
			<div style={menuStyle} className="genre-menu" onClick={(e) => {props.selectGenre(e)}}>
				<div className="genre-menu-item">All genres</div>
				{genreElems}
			</div>
		</div>
	)
}