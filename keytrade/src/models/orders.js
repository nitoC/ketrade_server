import mongoose from 'mongoose';

const { Schema } = mongoose;

const ordersSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'

    },
    price: {
        type: Number,
    },
    type: {
        type: String,
        enum: ['buy', 'sell']
    },
    value: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["pending", "complete"],
        default: 'pending'
    },
    currency: {
        type: String,
        enum: ["Btc", "Usdt"],
    },

}, { timestamps: true })

// ordersSchema.path('user').ref(user);

export default mongoose.model('orders', ordersSchema)