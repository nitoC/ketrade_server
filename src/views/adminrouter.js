const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const mongoose=require('mongoose')
const adminschema=require('../models/dmin')
const person=require('../models/models')
const dotenv=require('dotenv')
dotenv.config()
AdminBro.registerAdapter(AdminBroMongoose)


const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})
const admin={
  password:process.env.PASSWORD_AD,
  email:process.env.ADMIN
}
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
  authenticate: async (email, password) => {
      console.log(admin.password)
        
      if (admin.password === password && admin.email === email) {
        return admin
      }
      return null
    },
    cookieName: process.env.COOKIE_NAME,
    cookiePassword: process.env.COOKIE_PASSWORD,
  })
module.exports=router;