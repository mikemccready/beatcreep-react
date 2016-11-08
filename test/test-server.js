// test-server.js
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const Track = require('../server/models/Track')
const should = chai.should();

chai.use(chaiHttp);

describe('Tracks', () => {

  Track.collection.drop();

  beforeEach((done) => {
    const newTrack = new Track({
      'title': 'newSong', 
      'artist': 'newArtist', 
      'genre': 'db', 'plays': 0, 
      'favorited': false, 
      'source': 'beatport'
    });
    newTrack.save((err) => {
      done();
    });
  });
  afterEach((done) => {
    Track.collection.drop();
    done();
  });

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
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('title');
        res.body[0].should.have.property('artist');
        res.body[0].should.have.property('genre');
        res.body[0].should.have.property('plays');
        res.body[0].should.have.property('favorited');
        res.body[0].should.have.property('source');
        res.body[0].should.have.property('_id');
        res.body[0].title.should.equal('newSong');
        res.body[0].artist.should.equal('newArtist');
        res.body[0].genre.should.equal('db');
        res.body[0].plays.should.equal(0);
        res.body[0].favorited.should.equal(false);
        res.body[0].source.should.equal('beatport');
  			done();
  		});
  });

  it('should list a single track on /api/track/<id> GET', (done) => {
    const newTrack = new Track({
      'title': 'newSong', 
      'artist': 'newArtist', 
      'genre': 'db', 'plays': 0, 
      'favorited': false, 
      'source': 'beatport'
    });

    newTrack.save((err, track) => {
      chai.request(server)
        .get('/api/track/' + track.id)
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
          done()
        });
    })
  });

  it('should update a single track on /api/track/<id> PUT', (done) => {
    chai.request(server)
      .get('/api/tracks')
      .end((err, res) => {
        chai.request(server)
          .put('/api/track/' + res.body[0]._id)
          .send({'favorited': true})
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.favorited.should.equal(true);
            done();
          });
      });
  });

  it('should delete a single track on /api/track/<id> DELETE', (done) => {
    chai.request(server)
      .get('/api/tracks')
      .end((err, res) => {
        chai.request(server)
          .delete('/api/track/' + res.body[0]._id)
          .end((error, response) => {
            response.should.have.status(200);
            response.text.should.equal('Track Deleted');
            done();
          });
      });
  });
});




