const express = require('express')
const app = express()
const cors=require('cors')
const moment=require('moment')
const joi=require('@hapi/joi')
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const bodyParser=require('body-parser')
const routes=require('./routes/route')
const adminbro=require('admin-bro')
const adminbroExpress=require('@admin-bro/express')
const session=require('express-session')
const adminrouter=require('./views/adminrouter')
const cookieParser=require('cookie-parser')
dotenv.config()
const PORT =process.env.PORT
const db=process.env.ACCESS_KEY
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(err){
        console.log(err.message)
    }
    else{
        console.log("connected")
    }
})
app.use(cors())
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    savveUninitialized:false
}))
app.use('/admin',adminrouter)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(routes)


app.listen(PORT||80, () => console.log(`listening to port! ${PORT}`))