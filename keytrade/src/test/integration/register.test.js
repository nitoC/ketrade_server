import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index.js';
import { describe, it } from 'mocha'


chai.use(chaiHttp);
const should = chai.should();

describe('/POST/api/v1/register', () => {

    // successfull post request registration
    it('create a new user should be successful', (done) => {
        chai.request(app)
            .post('/api/v1/register')
            .send({
                name: 'John Doe',
                email: 'john@gmail.com',
                password: 'password',
                username: 'john',
                capital: 0,
                refreshToken: ''
            })
            .end((err, res) => {
                console.log('Response:', res.body);
                if (err) {
                    console.error('Error:', err.response.body); // Log the response body in case of an error
                    done(err);
                } else {
                    res.should.have.status(201);
                }
                done()
            });
    }).timeout(50000);

    // bad request by user when registration

    it('should return as status code of 400', (done) => {
        chai.request(app).post('/api/v1/register')
            .send({

            })
            .end((err, res) => {

                if (err) return console.log(err)
                else {
                    console.log('Response:', res.body);
                    res.should.have.status(400);
                }

                done()
            })
    })
});
