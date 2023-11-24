
import * as transactions from '../../services/transactions.js'
import * as UUID from 'uuid';
import { getUserById } from '../../services/auth.js';
import Joi from "@hapi/joi";

const withdraw = async (req, res) => {

    let { userId, value } = req.body;





    try {

        const joiSchema = Joi.object({
            userId: Joi.string().required().min(7),
            value: Joi.number().positive().min()
        })
        let validEntry = joiSchema.validate({ userId, value })

        if (!validEntry) return res.status(400).json({ message: "invalid request" })

        userId = userId.trim()
        value = parseFloat(value);


        let user = await getUserById(userId)
        if (!user || user.length < 1) return res.status(404).json({ message: 'user not found' })

        let result = await transactions.createtransaction({ user: userId, value, refrenceId: UUID.v4(), type: 'Debit' })

        if (result.err) throw new Error('internal server error')
        if (result.length < 1) return res.status(500).json({ message: 'oops! an error occured while creating a withdraw request' })


        return res.status(200).json({ message: " request created" });

    } catch (err) {
        console.log(err, 'error withdraw');
        return res.status(500).json({ message: 'oops! an error occured while creating a withdraw request' })
    }
};


export default withdraw;
