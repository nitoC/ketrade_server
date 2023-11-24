
import { getUserById } from "../../services/auth.js";
import Joi from "@hapi/joi";
import { createOrderService, getCompleteOrdersByIdService, getOrdersByIdService } from "../../services/orders.js";
import { createPortfolio, getPortfolioByType } from "../../services/portfolio.js";
import portfolio from "../../models/portfolio.js";


const createOrders = async (req, res) => {
    let { userId, value, price, type, currency } = req.body;
    console.log(req.body, 'user id orders')

    userId = userId.trim()
    value = parseFloat(value);
    price = parseFloat(price);
    type = type.trim()
    currency = currency.trim()

    try {
        const joiSchema = Joi.object({
            userId: Joi.string().required().min(7),
            value: Joi.number().positive(),
            price: Joi.number(),
            type: Joi.string().valid('buy', 'sell').required(),
            currency: Joi.string().required()
        })
        let validEntry = joiSchema.validate({ userId, value, price, type, currency })

        console.log(validEntry, 'valid')

        if (!validEntry) return res.status(400).json({ message: "invalid request" })



        let user = await getUserById(userId)
        console.log(user, 'user')

        if (!user || user.length < 1) return res.status(404).json({ message: 'user not found' })



        let portfolioData = await getPortfolioByType(userId, currency)
        if (portfolioData.length < 1) {
            portfolioData = await createPortfolio({ user: userId, currency })
        }
        if (portfolio.err) {
            return res.status(500).json({ message: portfolio.err })
        }
        console.log(portfolioData)
        let portfolioFormat = portfolioData[0].toJSON()

        let increment;
        increment = type === 'buy' ? value + portfolioFormat.value : portfolioFormat.value - value

        const order = await createOrderService({ user: userId, type, price, value: increment, currency })
        console.log("order", order)
        if (order.err) throw new Error('internal server error')
        return res.status(201).json({ status: " request created", payload: order });

    } catch (err) {
        console.log(err)
        console.log(err.message, 'error creating order');
        return res.status(500).json({ message: 'oops! an error occured while making an order request' })
    }
};

// get all orders by user id
const getOrders = async (req, res) => {
    let { userId } = req.params

    try {
        userId = userId.trim()
        let user = await getUserById(userId)

        if (user.err) throw new Error('server error')

        if (!user || user.length < 1) return res.status(401).json({ status: 'failed', message: 'invalid user id' })

        let orders = await getOrdersByIdService(userId)


        if (!orders || orders.err) {
            return res.status(500).json({ message: 'no orders! and error occured' })
        } else {
            return res.status(200).json({ message: "successful", payload: orders });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'no orders! and error occured' })
    }
};

// get all completed orders by user id
const getcompletedOrders = async (req, res) => {
    let { userId } = req.params

    try {
        userId = userId.trim()
        let user = await getUserById(userId)

        if (user.err) throw new Error('server error')

        if (!user || user.length < 1) return res.status(401).json({ status: 'failed', message: 'invalid user id' })

        let orders = await getCompleteOrdersByIdService(userId)


        if (!orders || orders.err) {
            return res.status(500).json({ message: 'no orders! and error occured' })
        } else {
            return res.status(200).json({ message: "successful", payload: orders });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'no orders! and error occured' })
    }
};


export {
    createOrders,
    getcompletedOrders,
    getOrders
}