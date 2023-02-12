const person=require('../../models/models')


const investors=async (req,res)=>{
    let pendingDeposits
    
    try{
        pendingDeposits=await person.find({balance:{$gt:0}})
    }catch(err){
        if(err){
            console.log(err.message)
        }

    }
    let filtered=pendingDeposits.map(({email,pending,balance,capital})=>{ 
        return {
          email,
          pending,
          balance,
          capital
        }
    })
    res.json(filtered)
}
module.exports=investors