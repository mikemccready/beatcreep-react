// web-scraper.js
const cheerio = require('cheerio');
const request = require('request');
const async = require('async');
const trackController = require('../controllers/track-controller');

let webscraper = {};

webscraper.scrape = (req, res) => {

	let pageNumber = 1;
	let trackData = {};

	function getChartUrls() {
		let url = 'https://www.beatport.com/charts/all?per-page=150&page=' + pageNumber;
		request(url, (err, response, body) => {
			if (err) return console.log(err);
			let $ = cheerio.load(body);
			let charts = $('.chart');

			let chartUrls = []
			charts.each((i, chart) => {
			let chartUrl = $(chart).find('a').attr('href');
			  chartUrls[i] = chartUrl; 
			});
			getChartTracks(chartUrls)
		});
	}

	function getChartTracks(urls) {
		console.log('got page urls')

		let trackPromises = [];
		urls.forEach((url, i) => {
			trackPromises.push(songPromiseMaker(url));
		});

		Promise.all(trackPromises).then(() => {
			if(pageNumber < 11) {
				pageNumber++;
				getChartUrls();
				console.log('rerun page', pageNumber)
			} else {
				trackController.saveTracksFromScraper(req, res, trackData);
			}
		});
	}

	function songPromiseMaker(url) {
		return new Promise((resolve, reject) => {
			request('https://www.beatport.com' + url, (error, reponse, html) => {
				let $ = cheerio.load(html);
				let tracks = $('body').find('.track');
				tracks.each((i, track) => {
					let artist = $(track).find('.buk-track-artists a').html();
					let title = $(track).find('.buk-track-title a').text().replace(/\s{2,}/g,' ').trim();
					let genre = $(track).find('.buk-track-genre a').text().replace(/\s{2,}/g,' ').trim();
					let trackId = artist + title;
					trackId = trackId.hashCode();

					if(!trackData[trackId]) {
						let trackObj = {};
						trackObj.artist = artist;
						trackObj.title = title;
						trackObj.genre = genre;
						trackObj.source = 'soundcloud';

						trackData[trackId] = trackObj;
						trackData[trackId].charted = 1;
						trackData[trackId].favorited = false;
					}else {
						trackData[trackId].charted++;
					}
				});
				resolve();
			});
		});
	}
	getChartUrls()
}

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};


module.exports = webscraper;



// 'use strict'
// const cheerio = require('cheerio');
// const request = require('request');
// const async = require('async');
// const trackController = require('./track-controller');

// let trackData = {};

// let genreMapInd = 0;
// let genreMap = [11,12,6,5,15,17,3,14,79,7,9,18,1,65,13]



module.exports = webscraper