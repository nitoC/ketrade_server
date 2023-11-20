import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index.js';


chai.use(chaiHttp);
const should = chai.should();

let type = 'buy'
let userId = '6557a88c9d0202cad2162fbd'
//let referreingUserId = '6557a88c9d0202cad2162fbd'
let price = 0.93393
let value = 34


describe('/POST/api/v1/orders', () => {

    // successfull post request: create referral
    it('to create an order should be successful', (done) => {
        chai.request(app)
            .post('/api/v1/orders')
            .send({
                userId,
                price,
                value,
                type
            })
            .end((err, res) => {
                if (err) {
                    console.error('Error:', err.response.body); // Log the response body in case of an error

                } else {
                    console.log('Response:', res.body);
                    res.should.have.status(201);
                }
                done()
            });
    }).timeout(50000);


    // successfull referral get request
    it('to get orders of a user should be successful', (done) => {
        chai.request(app)
            .get(`/api/v1/orders/${userId}`)
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

    // successfull  completed orders get request
    it('to get completed orders of a user should be successful', (done) => {
        chai.request(app)
            .get(`/api/v1/orders/completed/${userId}`)
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
    // it('wrong userId less than required should return a status of 400 when making a withdraw', (done) => {
    //     chai.request(app).post('/api/v1/withdraw')
    //         .send({
    //             userId: "chined",
    //             value,
    //             plan
    //         })
    //         .end((err, res) => {

    //             if (err) return console.log(err)
    //             else {
    //                 console.log('Response:', res.body);
    //                 res.should.have.status(400);
    //             }
    //             done()
    //         })
    // }).timeout(5000)

    // // bad request by user when depositing
    // it('wrong userId less than required should return a status of 400 when making deposit', (done) => {
    //     chai.request(app).post('/api/v1/deposit')
    //         .send({
    //             userId: "chined",
    //             value,
    //             plan
    //         })
    //         .end((err, res) => {

    //             if (err) return console.log(err)
    //             else {
    //                 console.log('Response:', res.body);
    //                 res.should.have.status(400);
    //             }
    //             done()
    //         })
    // }).timeout(5000)
});
