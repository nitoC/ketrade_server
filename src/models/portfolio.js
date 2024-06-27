import mongoose from 'mongoose';

const { Schema } = mongoose;

const portfolioSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'

    },
    value: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        enum: ["Btc", "Usdt"],
    },

})

// ordersSchema.path('user').ref(user);

export default mongoose.model('portfolio', portfolioSchema)