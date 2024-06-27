import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index.js';


chai.use(chaiHttp);
const should = chai.should();

let dType = 'deposit'
let value = 5000
let reference = 'kjflkfldjflkjflkfjlkfjlkjd'
let userId = '6557a88c9d0202cad2162fbd'
let plan = 'Gold'


describe('/POST/api/v1/transaction', () => {

    // successfull post request: deposit transaction
    it('to make deposit should be successful', (done) => {
        chai.request(app)
            .post('/api/v1/deposit')
            .send({
                value,
                userId,
                plan
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


    // successfull post request: withdraw transaction
    it('to make withdrawal should be successful', (done) => {
        chai.request(app)
            .post('/api/v1/withdraw')
            .send({
                value,
                userId,
                plan
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


    // bad request by user when withdrawing
    it('wrong userId less than required should return a status of 400 when making a withdraw', (done) => {
        chai.request(app).post('/api/v1/withdraw')
            .send({
                userId: "chined",
                value,
                plan
            })
            .end((err, res) => {

                if (err) return console.log(err)
                else {
                    console.log('Response:', res.body);
                    res.should.have.status(400);
                }
                done()
            })
    }).timeout(5000)

    // bad request by user when depositing
    it('wrong userId less than required should return a status of 400 when making deposit', (done) => {
        chai.request(app).post('/api/v1/deposit')
            .send({
                userId: "chined",
                value,
                plan
            })
            .end((err, res) => {

                if (err) return console.log(err)
                else {
                    console.log('Response:', res.body);
                    res.should.have.status(400);
                }
                done()
            })
    }).timeout(5000)
});
