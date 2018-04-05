// App.js
import React from 'react'
import ReactPlayer from 'react-soundcloud-widget'
import axios from 'axios'

import Track from '../components/Track'
import Selector from '../components/Selector'
import Creeper from '../components/Creeper/Creeper'
import MobileMenu from '../components/MobileMenu/MobileMenu'

import config from '../../config-secret.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	tracks: [],
    	filteredTracks: [],
    	genres: {},
    	selectedGenre: 'All genres',
    	menuOpen: false,
      results: null,
      resultIndex: null,
      shuffle: true,

      nowPlayingId: null,
      playingIndex: null,
      playingUrl: null,
      playing: false,
      SC_source: null,
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

	filterTracks() {
    // const genre = this.state.selectedGenre
    //
		// if (genre === 'All genres') {
		// 	return this.setState({filteredTracks: this.state.tracks});
		// }
    //
		// let filtered = this.state.tracks.filter(track => {
		// 	if (track.genre === genre) return track;
		// })
		// this.setState({filteredTracks: filtered});
	}

	getTracks() {
    axios.get('/api/tracks')
    .then(data => {
      this.setState({ tracks: data.data, filteredTracks: data.data }, () => {
        this.shuffleTracks()
        this.getGenres()
      })
    })
	}

	getGenres() {
		let genres = {}
    this.state.tracks.forEach(track => {
			if (!genres[track.genre]) genres[track.genre] = true
		})
		this.setState({ genres })
	}

	loadPlayer(track) {
		SC.get('/tracks', { q: track.artist + ' ' + track.title, title: track.title })
    .then(tracks => {
      this.setState({ results: tracks, resultIndex: 0 })
			const playingUrl = tracks[0].permalink_url
      this.setState({nowPlayingId: track._id, playingUrl, SC_source: tracks[0] })
		})
	}

  togglePlay() {
    const iframe = document.querySelector('#react-sc-widget')
    const widget = SC.Widget(iframe)
    widget.toggle()
  }

  nextTrack() {
    const currentIndex = this.state.playingIndex;
    this.loadPlayer(this.state.filteredTracks[currentIndex + 1])
    this.setState({ playingIndex: currentIndex + 1})
  }

  research() {
    const resultIndex = this.state.resultIndex + 1
    const playingUrl = this.state.results[resultIndex].permalink_url
    const SC_source = this.state.results[resultIndex]
    this.setState({ resultIndex, playingUrl, SC_source })
  }

	selectGenre(e) {
    const selectedGenre = e.target.innerHTML
		this.setState({ selectedGenre, menuOpen: false }, () => this.filterTracks())
	}

	sortTracksDesc() {
		const tracks = this.state.filteredTracks.sort((a, b) => b.charted - a.charted)
		this.setState({ filteredTracks: tracks, shuffle: false })
	}

  shuffleTracks() {
    const tracks = this.state.filteredTracks
    let currentIndex = tracks.length, temporaryValue, randomIndex

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = tracks[currentIndex];
      tracks[currentIndex] = tracks[randomIndex];
      tracks[randomIndex] = temporaryValue;
    }

    this.setState({ filteredTracks: tracks, shuffle: true })
  }

	toggleMenu() {
		const menuState = !this.state.menuOpen
		this.setState({menuOpen: menuState})
	}

  likeTrack() {
    const { playingIndex, filteredTracks, SC_source } = this.state
    const currentTrack = filteredTracks[playingIndex]
    currentTrack.SC_source = SC_source
    currentTrack.favorited = true

    let favorites = localStorage.getItem('favorites') ?
      JSON.parse(localStorage.getItem('favorites')) : {}

    favorites[SC_source.id] = currentTrack

    localStorage.setItem('favorites', JSON.stringify(favorites))
  }

  searchTracks(query) {
    const searched = this.state.tracks.filter(track => {
      if (track.artist.toLowerCase().includes(query.toLowerCase())) return track
      if (track.title.toLowerCase().includes(query.toLowerCase())) return track
    })

    this.setState({ filteredTracks: searched }, () => {
      if (this.state.shuffle) return this.shuffleTracks()
      return this.sortTracksDesc()
    })
  }

	render() {
    const { filteredTracks, nowPlayingId, playingIndex, playing, SC_source } = this.state

    let currentTrack = filteredTracks[playingIndex]

		let tracks = filteredTracks.map((track, i) => {
				return <Track key={i}
            index={i}
						trackData={track}
            nextTrack={e => this.loadPlayer(filteredTracks[i + 1])}
						loadPlayer={track => this.loadPlayer(track)}
						nowPlayingId={nowPlayingId}
            updatePlayIndex={i => this.setState({ playingIndex: i })}
            research={() => this.research()} />
			}
		)

		return(
			<div className="app-container">
        <div className="list-container">
          <h1>BEATCREEP <button>...</button></h1>

          <MobileMenu
            shuffle={this.state.shuffle}
            shuffleTracks={() => this.shuffleTracks()}
            sortTracksDesc={() => this.sortTracksDesc()}
            searchTracks={query => this.searchTracks(query)} />

          {
            this.state.playingUrl &&
            <ReactPlayer
              opts={{ auto_play: true }}
              url={this.state.playingUrl}
              onPlay={() => this.setState({ playing: true })}
              onPause={() => this.setState({ playing: false })}
              onEnd={() => this.nextTrack()} />
          }

          { tracks }

        </div>

        {
          SC_source &&
          <Creeper
            playing={playing}
            SC_source={SC_source}
            research={() => this.research()}
            togglePlay={() => this.togglePlay()}
            nextTrack={() => this.nextTrack()}
            likeTrack={() => this.likeTrack()} />
        }
			</div>
		)
	}
}


// <Selector
// 	genres={this.state.genres}
// 	selected={this.state.selectedGenre}
// 	selectGenre={e => this.selectGenre(e)}
// 	toggleMenu={() => this.toggleMenu()}
// 	menuOpen={this.state.menuOpen} />
