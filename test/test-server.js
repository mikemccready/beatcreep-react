// test-server.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const should = chai.should();

chai.use(chaiHttp);

describe('Tracks', () => {
  it('should list all tracks on /api/tracks GET', (done) => {
  	chai.request(server)
  		.get('/api/tracks')
  		.end((err, res) => {
  			res.should.have.status(200);
  			res.should.be.json;
  			res.body.should.be.a('array');
  			done();
  		});
  });

  it('should list a single track on /api/track/<id> GET');

  it('should add a single track on /api/tracks POST', (done) => {
  	chai.request(server)
  		.post('/api/tracks')
  		.send({'title': 'newSong', 'artist': 'newArtist', 'genre': 'db', 'plays': '0', 'favorited': 'false', 'source': 'beatport'})
  		.end((err, res) => {
  			res.should.have.status(200);
  			res.should.be.json;
  			res.body.should.be.a('object');
  			res.body.should.have.property('SUCCESS');
	      res.body.SUCCESS.should.be.a('object');
	      res.body.SUCCESS.should.have.property('title');
	      res.body.SUCCESS.should.have.property('artist');
	      res.body.SUCCESS.should.have.property('genre');
	      res.body.SUCCESS.should.have.property('plays');
	      res.body.SUCCESS.should.have.property('favorited');
	      res.body.SUCCESS.should.have.property('source');
	      res.body.SUCCESS.should.have.property('_id');
	      res.body.SUCCESS.title.should.equal('newSong');
	      res.body.SUCCESS.artist.should.equal('newArtist');
	      res.body.SUCCESS.genre.should.equal('db');
	      res.body.SUCCESS.plays.should.equal('0');
	      res.body.SUCCESS.favorited.should.equal('false');
	      res.body.SUCCESS.source.should.equal('beatport');
	      done();     	      
  		})
  });

  it('should update a single track on /api/track/<id> PUT');

  it('should delete a single track on /api/track/<id> DELETE');
});