import mongoose from 'mongoose';

const { Schema } = mongoose;

const planSchema = new Schema({
    type: {
        type: String,
    }

})


const Plan = mongoose.model('plan', planSchema);



export default Plan