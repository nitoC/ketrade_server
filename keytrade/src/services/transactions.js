import transactionRepository from '../models/transactions.js'



const gettransactionByUserId = async (user) => {
    try {
        let transaction = await transactionRepository.find({ user });
        console.log(transaction, 'transaction by id')
        return transaction;
    } catch (err) {
        console.log(err.message);
        return { err }
    }

}



const gettransactionById = async (transactionId) => {
    try {
        let transaction = await transactionRepository.findById(transactionId);
        return transaction;
    } catch (err) {
        console.log(err.message);
        return { err }
    }

}



const createtransaction = async (transactionData) => {

    const transaction = new transactionRepository(transactionData);


    try {
        let transactionSaved = await transaction.save();
        console.log(transactionSaved, 'saved transaction')
        return transactionSaved;

    } catch (err) {
        console.log(err.message)
        if (err) return { err };
    }

}



const updatetransaction = async (transactionData, updateParam) => {
    let result;

    try {

        result = await transaction.findByIdAndUpdate(transactionData, { status: updateParam })

        consol.log(result);
        return result;
    } catch (err) {
        console.log(err.message)
        return { err }
    }
}



const deletetransaction = async (transactionData) => {
    try {
        let deletedtransaction = await transaction.deleteOne({ _id: transactionData });
        console.log(deletedtransaction)
        return deletedtransaction;
    } catch (err) {
        console.log(err.message)
        return { err }
    }
}


export {
    gettransactionByUserId,
    gettransactionById,
    createtransaction,
    updatetransaction,
    deletetransaction
}