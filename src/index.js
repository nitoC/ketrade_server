import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes/route.js';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import session from 'express-session';
import * as AdminJSMongoose from '@adminjs/mongoose'
import cookieParser from 'cookie-parser';
import user from './models/user.js';
import transactions from './models/transactions.js';
import notification from './models/notification.js';
import resetPassword from './models/resetPassword.js';
import plan from './models/plan.js';
import orders from './models/orders.js';
import dmin from './models/dmin.js';
import referral from './models/referral.js';
import portfolio from './models/portfolio.js';

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
})



const app = express();

// Rest of your code



dotenv.config()


const PORT = process.env.PORT
const db = process.env.ACCESS_KEY


app.use(cors())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/api/v1', routes)
app.get('/', (req, res) => {
    res.status(200).json({ message: "hello world" })
})





const start = async () => {


    let dataBase = await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(dataBase, 'hello')
    const adminOptions = {
        // We pass Category to `resources`
        resources: [
            user,
            transactions,
            notification,
            resetPassword,
            plan,
            referral,
            orders,
            dmin,
            portfolio
        ],
    }
    // Please note that some plugins don't need you to create AdminJS instance manually,
    // instead you would just pass `adminOptions` into the plugin directly,
    // an example would be "@adminjs/hapi"
    const admin = new AdminJS(adminOptions)


    // const ConnectSession = Connect(session)
    // const sessionStore = new ConnectSession({
    //     conObject: {
    //         connectionString: db,
    //         ssl: process.env.NODE_ENV === 'production',
    //     },
    //     tableName: 'session',
    //     createTableIfMissing: true,
    // })

    // const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    //     admin,
    //     {
    //         authenticate,
    //         cookieName: 'adminjs',
    //         cookiePassword: 'sessionsecret',
    //     },
    //     null,
    //     {
    //         store: sessionStore,
    //         resave: true,
    //         saveUninitialized: true,
    //         secret: 'sessionsecret',
    //         cookie: {
    //             httpOnly: process.env.NODE_ENV === 'production',
    //             secure: process.env.NODE_ENV === 'production',
    //         },
    //         name: 'adminjs',
    //     }
    // )

    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)

    app.listen(PORT || 80, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    })
}

start()

export default app;