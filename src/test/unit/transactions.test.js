import chai, { expect, should } from 'chai'
import chaiHttp from 'chai-http'
import * as transactions from '../../services/transactions.js'

chai.use(chaiHttp)

let dType = 'deposit'
let value = 5000
let reference = 'kjflkfldjflkjflkfjlkfjlkjd'
let userId = '6557a88c9d0202cad2162fbd'
let status = 'pending'


describe('testing transactions services', () => {


    describe('create transaction', async () => {
        let transact = await transactions.createtransaction({
            type: dType,
            value,
            referenceId: reference,
            user: userId,
            status
        })
        it('create transaction should be successfull', () => {
            expect(transact).to.be.an('array')
        });
    }).timeout(5000);



    describe('get transactions by user Id', async () => {
        let transact = await transactions.gettransactionByUserId(userId)
        it('create transaction should be successfull', () => {
            expect(transact).to.be.an('array')
        });
    }).timeout(5000);



    // describe('create transaction', async () => {
    //     let transact = await transactions.createtransaction({
    //         type: dType,
    //         value,
    //         referenceId: reference,
    //         user: userId,
    //         status
    //     })
    //     it('create transaction should be successfull', () => {
    //         expect(transact).to.be.an('array')
    //     });
    // });
});