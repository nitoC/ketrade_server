const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const user = require("../../models/models");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");
const joiSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().min(6).email().required(),
  username: joi.string().required(),
  password: joi.string().required().min(6),
});
const signup = async (req, res) => {
  console.log("in")
  let userExists;
  const { name, email, username, password } = req.body;
  const j = joiSchema.validate({ name, email, username, password });
  if (j.error) return res.json({ message: j.error.details[0].message });
  try {
    userExists = await user.find({ email: email.toLowerCase() });
    console.log('user exist?')
  } catch (err) {
    console.log(err.message);
  }
  if (userExists[0]) return res.json({ message: "user exists please login" });
  let salt;
  let hash;
  try {
    salt = await bcrypt.genSalt(8);
    hash = await bcrypt.hash(password, salt);
  } catch (error) {
    if (error) console.log("password not hashed");
  }
  console.log("saving time")
  const eachUser = new user({
    username: username,
    name: name,
    email: email.toLowerCase(),
    capital: 0.0,
    balance: 0.0,
    plan: "",
    password: hash,
    resetToken: "",
    expireToken: null,
    pending: {
      plan: null,
      deposit: 0,
    },
    withdrawal: {
      address: "",
      amount: 0,
    },
    transactions: [],
  });
  try {
    await eachUser.save((err, res) => {
      if (err) return res.status(500).json(err.message);
      else {
        return console.log("user saved signup");
      }
    });
    res.status(200).json({ registered: true });
  } catch (err) {
    if (err) return res.json({ message: err.message });
  }
};
module.exports = signup;
