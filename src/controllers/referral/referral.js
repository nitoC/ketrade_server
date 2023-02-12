const mongoose= require("mongoose")
const bcrypt = require("bcryptjs");
const referM = require("../../models/referModel");
const user = require("../../models/models");
const joi = require("@hapi/joi");
const joiSchema = joi.object({
    rEmail: joi.string().min(6).email().required(),
    rData:{
        name: joi.string().required(),
        email: joi.string().min(6).email().required(),
        username: joi.string().required(),
    }
});

const refer=async (req,res)=>{
    let refered;
    let exist;
    console.log("in refer")
    const {rEmail,nUser} = req.body
    console.log(req.body)
    console.log(nUser)
    try{
        console.log("in try first")

        exists= await user.findOne({email:rEmail.toLowerCase()})
        console.log("this is exist section",rEmail)
        console.log(exists)
    }catch(error){
        if(error) console.log(error.message)
    }
    if(!exists) return res.json("no such referrer in database")
    validate=joiSchema.validate({rEmail:rEmail.toLowerCase(),rData:nUser})
    console.log(validate)
    console.log("validate section")

    if(validate.error) return res.json('an error occured')
     refered= new referM({
        rEmail:rEmail.toLowerCase(),
        rData:nUser
    })
    try{
        console.log("in try")
            await refered.save(()=>{

                console.log("user Saved refer")
            } )
    }catch(error){
        if(error) return res.json(error.message)
    }
    console.log('referring completed successfully')
    res.status(200).json("refer complete")
}
module.exports =refer