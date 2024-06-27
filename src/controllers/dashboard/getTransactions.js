import transaction from "../../models/transactions.js";
import * as transactions from '../../services/transactions.js'
import { getUserById } from "../../services/auth.js";
import Joi from "@hapi/joi";
import filterTransactions from "../../utils/filterTransaction.js";


const getTransactions = async (req, res) => {

    let { userId } = req.params;

    console.log(userId)



    try {

        const joiSchema = Joi.object({
            userId: Joi.string().required().min(7),
        })
        let validEntry = joiSchema.validate({ userId })
        console.log(userId, '1st')
        if (!validEntry) return res.status(400).json({ message: "invalid request" })

        console.log(userId, '2nd')
        userId = userId.trim()

        let user = await getUserById(userId)
        if (!user || user.length < 1 || user.err) return res.status(404).json({ message: 'user not found' })

        let result = await transactions.gettransactionByUserId(userId)

        if (result.err) throw new Error('internal server error')


        let final = filterTransactions(result)

        return res.status(200).json({ status: " success", payload: final });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'oops! an error occured while getting transactions' })
    }
};


export default getTransactions;
