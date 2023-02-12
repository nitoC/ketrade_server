const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const person = require("../../models/models");

const reset = async (req, res) => {
  let user;
  let user1;
  const { pass, id } = req.body;
  if (pass.password != pass.reEnter)
    return res.json({ message: "passwords does not match" });
  try {
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(pass.password, salt);
    console.log(hash);
    user = await person
      .findOneAndUpdate(
        { resetToken: id, expireToken: { $gt: Date.now() } },
        { password: hash },
        (err, response) => {
          if (err) {
            console.log(err.message);
            return res.json("there was an error retry");
          } else {
            console.log(response);
            return response; // res.status(200).json('password changed successfully')
          }
        }
      )
      .clone();
    console.log(user);
  } catch (err) {
    if (err) {
      console.log(err.messsage);
    }
  }
  if (user) {
    res.status(200).json("password changed successfully");
  } else {
    res.json("token expired");
  }
};
module.exports = reset;
