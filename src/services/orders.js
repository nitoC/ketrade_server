import ordersRepository from "../models/orders.js";

const getOrdersByIdService = async (userId) => {
    try {
        let orders = await ordersRepository.find({ user: userId });
        console.log(orders)
        return orders;
    } catch (err) {
        console.log(err.message);
        return { err };
    }

}

const getCompleteOrdersByIdService = async (userId) => {
    try {
        let orders = await ordersRepository.find({ user: userId, status: 'complete' });
        console.log(orders)
        return orders;
    } catch (err) {
        console.log(err.message);
        return { err };
    }

}



const createOrderService = async (orderData) => {

    const order = new ordersRepository(orderData);


    try {
        let orderSaved = await order.save();
        console.log(orderSaved)
        return orderSaved;

    } catch (err) {
        console.log(err.message)
        if (err) return { err };
    }

}

export {
    getOrdersByIdService,
    getCompleteOrdersByIdService,
    createOrderService
}
