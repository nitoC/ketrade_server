const mongoose = require("mongoose")

const referSchema = new mongoose.Schema({
    
    rEmail:{
        type:String,
        required:true
    },
    rData:{
       
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        }

    }
})
module.exports=mongoose.model('refer',referSchema)