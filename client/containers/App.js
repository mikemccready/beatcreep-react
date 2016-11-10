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
    	selectedGenre: 'All genres',
    	menuOpen: 'false',
    	nowPlayingId: null
    }

    this.loadPlayer = this.loadPlayer.bind(this);
    this.selectGenre = this.selectGenre.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
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

	loadPlayer(e, track) {
		SC.get('/tracks', {
		  q: track.artist + ' ' + track.title, title: track.title
		}).then(function(tracks) {
		  tracks.sort(function(a, b) {
		  	return b.likes_count - a.likes_count;
		  })

			const track_url = tracks[0].permalink_url;
			const download_url = tracks[0].stream_url;

			SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
			  document.getElementById('player').innerHTML = oEmbed.html;
			});
		}); 
		this.setState({nowPlayingId: track._id});
		// console.log(this.state.nowPlayingTrackId)
	}

	selectGenre(e) {
		let genre = e.target.innerHTML.replace(/&amp;/g, '&');
		this.setState({selectedGenre: genre});
		this.setState({menuOpen: false});
		this.filterTracks(genre);
	}

	sortTracksDesc(trackData) {
		trackData.sort((a, b) => {
			return b.charted - a.charted;
		})
		this.setState({tracks: trackData});
		this.setState({filteredTracks: trackData});
	}

	toggleMenu() {
		const menuState = !this.state.menuOpen;
		console.log(menuState)
		this.setState({menuOpen: menuState});
	}

	render() {
		let tracks = this.state.filteredTracks.map((track, i) => {
				return <Track key={i} 
						trackData={track} 
						loadPlayer={this.loadPlayer} 
						nowPlayingId={this.state.nowPlayingId} />
			}
		)
		return(
			<div className="app-container">
				<Selector 
					genres={this.state.genres} 
					selected={this.state.selectedGenre} 
					selectGenre={this.selectGenre}
					toggleMenu={this.toggleMenu}
					menuOpen={this.state.menuOpen} />
				{tracks}
			</div>
		)
	}
}