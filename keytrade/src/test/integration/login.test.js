import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index.js';
import { describe, it } from 'mocha';


chai.use(chaiHttp);
const should = chai.should();

let email = 'johndoe@gmail.com'
let password = 'chinedu123'
describe('/POST/api/v1/login', () => {

    // successfull post request: login
    it('to login a user should be successful', (done) => {
        chai.request(app)
            .post('/api/v1/login')
            .send({
                email,
                password,
            })
            .end((err, res) => {
                if (err) {
                    console.error('Error:', err.response.body); // Log the response body in case of an error

                } else {
                    console.log('Response:', res.body);
                    res.should.have.status(200);

                }
                done()
            });
    }).timeout(50000);

    // bad request by user when registration

    it('bad request should return as status code of 400', (done) => {
        chai.request(app).post('/api/v1/login')
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
    }).timeout(50000)

    // wrong password test
    it('wrong password should return a status of 401', (done) => {
        chai.request(app).post('/api/v1/login')
            .send({
                email,
                password: "jahjehova"
            })
            .end((err, res) => {

                if (err) return console.log(err)
                else {
                    console.log('Response:', res.body);
                    res.should.have.status(401);
                }
                done()
            })
    }).timeout(50000)
    // wrong password test
    it('wrong email should return a status of 404', (done) => {
        chai.request(app).post('/api/v1/login')
            .send({
                email: "chinedu@gmail.com",
                password
            })
            .end((err, res) => {

                if (err) return console.log(err)
                else {
                    console.log('Response:', res.body);
                    res.should.have.status(404);
                }
                done()
            })
    }).timeout(50000)
});
