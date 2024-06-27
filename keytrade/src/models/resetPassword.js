import mongoose from 'mongoose';

const { Schema } = mongoose;

const resetSchema = new Schema({
    token: {
        type: String,
    },
    createdDate: {
        type: Number,
    },
    status: {
        type: String,
    },

})

//resetSchema.path('user').ref('user');

export default mongoose.model('resetPassord', resetSchema)