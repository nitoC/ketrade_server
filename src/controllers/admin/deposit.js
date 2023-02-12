const person=require('../../models/models')

const deposit=async(req,res)=>{
        const {email,capital,balance,plan}=req.body;
        let useer;
        try{  
            user=await person.updateOne({email},{capital:{$inc:capital},balance:{$inc:capital},plan,"pending.plan":null,"pending.deposit":0})
        }catch(err){
            if(err){
                cosole.log(err)
            }
            console.log(user)
            res.json('changes successfully added')
        }

}