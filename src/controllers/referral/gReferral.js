const mongoose= require("mongoose")
const referrals=require("../../models/referModel")

const gReferral= async (req,res)=>{
    const {email}=req.body
    console.log(req.body)
    console.log("getting referrals")
    console.log(email)
    let refers;
    try{
        refers = await referrals.find({rEmail:email.toLowerCase()})
        console.log("getting referrals num")
      console.log(refers)

    }catch(error){
        if(error) return res.json("an error occured")
    }
    if(refers){
        return res.json(refers.length)
    }
}
module.exports = gReferral