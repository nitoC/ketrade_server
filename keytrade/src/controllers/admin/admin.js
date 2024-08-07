const person = require('../../models/user.js')


const pending = async (req, res) => {
    let pendingDeposits

    try {
        pendingDeposits = await person.find({ "pending.deposit": { $gt: 0 } })
    } catch (err) {
        if (err) {
            console.log(err.message)
        }

    }
    let filtered = pendingDeposits.map(({ email, pending, balance, capital }) => {
        return {
            email,
            pending,
            balance,
            capital
        }
    })
    res.json(filtered)
}
module.exports = pending