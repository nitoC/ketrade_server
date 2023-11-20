import transaction from "../../models/transactions.js";
import * as transactions from '../../services/transactions.js'
import { getUserById } from "../../services/auth.js";
import * as UUID from 'uuid';
import Joi from "@hapi/joi";


const deposit = async (req, res) => {

    let { userId, value, plan } = req.body;

    userId = userId.trim()
    value = parseFloat(value);
    plan = plan.trim()


    let minimum;
    if (plan === 'Gold') {
        minimum = 10
    }
    if (plan === 'Diamond') {
        minimum = 500
    }
    if (plan === 'Platinum') {
        minimum = 1000
    }

    const joiSchema = Joi.object({
        userId: Joi.string().required().min(7),
        value: Joi.number().positive().min(minimum)
    })
    let validEntry = joiSchema.validate({ userId, value })

    if (!validEntry) return res.status(400).json({ message: "invalid request" })

    try {
        let user = await getUserById(userId)
        if (!user || user.length < 1) return res.status(404).json({ message: 'user not found' })
        let result = await transactions.createtransaction({ user: userId, value, refrenceId: UUID.v4(), type: 'Credit' })

        if (result.err) throw new Error('internal server error')
        if (result.length < 1) return res.status(500).json({ message: 'oops! an error occured while making deposit' })


        return res.status(200).json({ message: " request created" });

    } catch (err) {
        console.log(err.message, 'error deposit');
        return res.status(500).json({ message: 'oops! an error occured while making deposit' })
    }
};
export default deposit;
