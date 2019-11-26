import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import FlightDetails from './mock';
import server from '..';

const { search } = new FlightDetails();
chai.use(chaiHttp);

describe('POST /v1/flight/search-flight', () => {
  it('Customer can search for available flights', (done) => {
    chai
      .request(server)
      .post('/v1/flight/search-flight')
      .send(search)
      .then((res) => {
        expect(res.body).to.be.an('object');
        console.log('RESPONSE::', res.body);
        done();
      })
      .catch((err) => done(err));
  });
});
