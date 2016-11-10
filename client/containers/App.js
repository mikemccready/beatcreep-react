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
    this.selectGenre = this.selectGenre.bind(this);
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

	filterTracks(genre) {
		if (genre === 'All genres') {
			return this.setState({filteredTracks: this.state.tracks});
		}

		let filtered = this.state.tracks.filter(track => {
			if (track.genre === genre) {
				return track;
			}
		})

		this.setState({filteredTracks: filtered});
	}

	getTracks() {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let trackData = JSON.parse(xhr.responseText)
				this.sortTracksDesc(trackData);
				this.getGenres(trackData);
			}
		}
		xhr.open('GET', '/api/tracks');
		xhr.send();
	}

	getGenres(trackData) {
		let genreList = {}
		trackData.forEach((track) => {
			if (!genreList[track.genre]) genreList[track.genre] = true;
		});
		this.setState({genres: genreList})
	}

	selectGenre(e) {
		let genre = e.target.innerHTML;
		this.setState({selectedGenre: genre});
		this.filterTracks(genre);
	}

	sortTracksDesc(trackData) {
		trackData.sort((a, b) => {
			return b.charted - a.charted;
		})
		this.setState({tracks: trackData});
		this.setState({filteredTracks: trackData});
	}

	render() {
		let tracks = this.state.filteredTracks.map((track, i) => {
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