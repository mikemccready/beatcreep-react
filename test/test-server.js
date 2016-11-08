// test-server.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const should = chai.should();

chai.use(chaiHttp);

describe('Tracks', () => {

  it('should add a single track on /api/tracks POST', (done) => {
    chai.request(server)
      .post('/api/tracks')
      .send({'title': 'newSong', 'artist': 'newArtist', 'genre': 'db', 'plays': 0, 'favorited': false, 'source': 'beatport'})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('artist');
        res.body.should.have.property('genre');
        res.body.should.have.property('plays');
        res.body.should.have.property('favorited');
        res.body.should.have.property('source');
        res.body.should.have.property('_id');
        res.body.title.should.equal('newSong');
        res.body.artist.should.equal('newArtist');
        res.body.genre.should.equal('db');
        res.body.plays.should.equal(0);
        res.body.favorited.should.equal(false);
        res.body.source.should.equal('beatport');
        done();             
      })
  });

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

  it('should update a single track on /api/track/<id> PUT');

  it('should delete a single track on /api/track/<id> DELETE');
});