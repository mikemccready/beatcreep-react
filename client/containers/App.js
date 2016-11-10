// App.js
import React from 'react';
import config from '../../config-secret.js';

import Track from '../components/Track';
import Selector from '../components/Selector';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	tracks: [],
    	filteredTracks: [],
    	genres: {},
    	selectedGenre: 'All genres'
    }
  }

	componentDidMount() {
		this.getTracks();
		this.initializeSC();
	}

	initializeSC(){
		SC.initialize({
		  client_id: config.soundcloud
		});
	}

	getTracks() {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let trackData = JSON.parse(xhr.responseText)
				this.setState({tracks: trackData});
				this.sortTracksDesc();
				this.getGenres();
			}
		}
		xhr.open('GET', '/api/tracks');
		xhr.send();
	}

	getGenres() {
		let genreList = {}
		this.state.tracks.forEach((track) => {
			if (!genreList[track.genre]) genreList[track.genre] = true;
		});
		this.setState({genres: genreList})
	}

	selectGenre(e) {
		let genre = e.target.innerHTML;


	}

	sortTracksDesc() {
		const tracks = this.state.tracks.slice();
		tracks.sort((a, b) => {
			return b.charted - a.charted;
		})
		this.setState({tracks: tracks})
	}

	render() {
		let tracks = this.state.tracks.map((track, i) => {
				return <Track key={i} trackData={track} />
			}
		)
		return(
			<div>
				<Selector genres={this.state.genres} selected={this.state.selectedGenre} selectGenre={this.selectGenre} />
				{tracks}
			</div>
		)
	}
}