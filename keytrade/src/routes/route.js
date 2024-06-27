import express from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import signup from '../controllers/auth/signup.js';
import deposit from '../controllers/dashboard/deposit.js';
import withdraw from '../controllers/dashboard/withdraw.js';
import transaction from '../controllers/dashboard/getTransactions.js';
// import gReferral from '../controllers/referral/gReferral.js';
// import pending from '../controllers/admin/admin.js';
import signin from '../controllers/auth/signin.js';
import Authorize from '../middlewares/authorization.js';
import refreshAccessToken from '../controllers/auth/refreshToken.js';
import { createReferral, getReferrals } from '../controllers/dashboard/referral.js';
import { createOrders, getOrders, getcompletedOrders } from '../controllers/dashboard/orders.js';
// import resetPassword from '../controllers/auth/resetPassword.js';
// import forgotPassword from '../controllers/auth/forgotPassword.js';
// import dashboard from '../controllers/dashboard/dashboard.js';

const router = express.Router();
// all patch request or endpoints
//router.patch("/reset", resetPassword);
//router.patch("/withdraw", withdraw);
// all post request or endpoints
router.post("/deposit", Authorize, deposit);
router.post("/withdraw", Authorize, withdraw);
router.post("/orders", Authorize, createOrders);
router.post("/refreshToken", refreshAccessToken);
//router.post("/forgotPassword", forgotPassword);
router.post("/register", signup);
router.post("/referrals", Authorize, createReferral);
router.post("/login", signin);
// all get request or endpoints
router.get("/transactions/:userId", Authorize, transaction);
router.get("/referrals/:userId", Authorize, getReferrals);
router.get("/orders/:userId", Authorize, getOrders);
router.get("/orders/completed/:userId", Authorize, getcompletedOrders);
//router.get("/referrals/:userId", getReferrals);
// router.get("/pending", pending);

export default router;
