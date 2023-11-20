import transaction from "../../models/transactions.js";
import * as portfolio from '../../services/portfolio.js'
import { getUserById } from "../../services/auth.js";
import Joi from "@hapi/joi";


export const getPortfolios = async (req, res) => {

    let { userId } = req.params;

    userId = userId.trim()



    const joiSchema = Joi.object({
        userId: Joi.string().required().min(7),
    })
    let validEntry = joiSchema.validate({ userId })

    if (!validEntry) return res.status(400).json({ message: "invalid request" })

    try {
        let user = await getUserById(userId)
        if (!user || user.length < 1 || user.err) return res.status(404).json({ message: 'user not found' })

        let result = await portfolio.getPortfolioUserById(userId)

        if (result.err) throw new Error('internal server error')


        return res.status(200).json({ status: " success", payload: final });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: 'oops! an error occured while getting portfolio' })
    }
};



export const getPortfoliosByType = async (req, res) => {

    let { userId, currency } = req.params;

    userId = userId.trim()



    const joiSchema = Joi.object({
        userId: Joi.string().required().min(7),
    })
    let validEntry = joiSchema.validate({ userId })

    if (!validEntry) return res.status(400).json({ message: "invalid request" })

    try {
        let user = await getUserById(userId)
        if (!user || user.length < 1 || user.err) return res.status(404).json({ message: 'user not found' })

        let result = await portfolio.getPortfolioByType(userId, currency)

        if (result.err) throw new Error('internal server error')


        return res.status(200).json({ status: " success", payload: final });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: 'oops! an error occured while getting portfolio' })
    }
};




const createPortfolios = async (req, res) => {

    let { userId, currency } = req.body;

    userId = userId.trim()
    currency = plan.trim()



    const joiSchema = Joi.object({
        userId: Joi.string().required().min(7),
        currency: Joi.number().required()
    })
    let validEntry = joiSchema.validate({ userId, currency })

    if (!validEntry) return res.status(400).json({ message: "invalid request" })

    try {
        let user = await getUserById(userId)
        if (!user || user.length < 1) return res.status(404).json({ message: 'user not found' })
        let result = Promise.all([await portfolio.createPortfolio({ user: userId, currency, type: 'Btc' }), await portfolio.createPortfolio({ user: userId, currency, type: 'Usdt' })])

        if (result.err || result[0].err || result[1].err) throw new Error('internal server error')
        if (result.length < 1) return res.status(500).json({ message: 'oops! an error occured while making deposit' })


        return res.status(200).json({ message: " portfolio request created" });

    } catch (err) {
        console.log(err.message, 'error deposit');
        return res.status(500).json({ message: 'oops! an error occured while making deposit' })
    }
};
export default deposit;



