// App.js
import React from 'react';
import config from '../../config-secret.js';

import Track from '../components/Track';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	tracks: [],
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
				// this.setState({tracks: trackData, filteredTracks: trackData})
				// this.sortTracksDesc();
				// this.populateSelector();
			}
		}
		xhr.open('GET', '/api/tracks');
		xhr.send();
	}

	render() {
		let tracks = this.state.tracks.map((track, i) => {
				return <Track key={i} trackData={track} />
			}
		)
		return(
			<div>
				{tracks}
			</div>
		)
	}
}