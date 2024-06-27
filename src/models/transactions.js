import mongoose from 'mongoose';

const { Schema } = mongoose;

const transactionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'

    },
    refrenceId: {
        type: String,
    },
    type: {
        type: String,
        enum: ['Credit', 'Debit']
    },
    value: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['pending', 'complete', 'failed'],
        default: 'pending'
    },

}, { timestamps: true })

//  transactionSchema.path('user').ref('user');

export default mongoose.model('transaction', transactionSchema)
