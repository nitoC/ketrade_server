const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signup = require("../controllers/auth/signup");
const deposit = require("../controllers/dashboard/deposit");
const address = require("../controllers/dashboard/address");
const withdraw = require("../controllers/dashboard/withdraw");
const referral = require("../controllers/referral/referral");
const gReferral = require("../controllers/referral/gReferral");
const pending = require("../controllers/admin/admin");
const signin = require("../controllers/auth/signin");
const resetPassword = require("../controllers/auth/resetPassword");
const forgotPassword = require("../controllers/auth/forgotPassword");
const dashboard = require("../controllers/dashboard/dashboard");
const router = express.Router();
// all patch request or endpoints
router.patch("/reset", resetPassword);
router.patch("/withdraw", withdraw);
router.patch("/deposit", deposit);
// all post request or endpoints
router.post("/get-referral", gReferral);
router.post("/forgotPassword", forgotPassword);
router.post("/register", signup);
router.post("/referral",referral );
router.post("/login", signin);
// all get request or endpoints
router.get("/address", address);
router.get("/dashboard", dashboard);
router.get("/pending", pending);

module.exports = router;
