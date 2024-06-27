import mongoose from 'mongoose';

const { Schema } = mongoose;

const notificationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'

    },
    type: {
        type: String,
    },
    status: {
        type: String,
    },

}, { timestamps: true })

//transactionSchema.path('user').ref(user);

export default mongoose.model('notification', notificationSchema)