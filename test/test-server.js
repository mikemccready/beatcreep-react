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
  			done();
  		});
  });

  it('should list a single track on /api/track/<id> GET');

  it('should add a single track on /api/tracks POST');

  it('should update a single track on /api/track/<id> PUT');

  it('should delete a single track on /api/track/<id> DELETE');
});