import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index.js';
import { describe, it } from 'mocha'

chai.use(chaiHttp);
const should = chai.should();


describe('GET /', () => {
    it('should return status 200', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                console.log('Response:', res.body);
                if (err) {
                    console.error('Error:', err.response.body);
                    done(err);
                } else {
                    res.should.have.status(200);
                    done();
                }
            });
    });
});
