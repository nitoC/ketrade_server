import crypto from 'crypto';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import person from '../../models/user.js';
import { URL } from 'url';


const forgotPassword = async (req, res) => {
  const requrl = url.parse(req.header('Referer'), true)
  console.log(req.header('Referer'));
  console.log(requrl.protocol);
  console.log(requrl.host);
  console.log(requrl.hostname);
  let user;
  let token;
  let userUpdate;
  let { email } = req.body;
  try {
    const user = await person
      .find({ email }, (error, response) => {
        if (error) {
          return res.status(400).json(error.message);
        } else {
          if (response === null) {
            return res.json({ message: "no such user" });
          }
          return response;
        }
      })
      .clone();
    if (user.length < 1) {
      return res.json("no such user")
    } console.log(user)

    token = crypto.randomBytes(20).toString("hex");
    userUpdate = await person
      .findOneAndUpdate(
        { email },
        { resetToken: token, expireToken: Date.now() + 900000 },
        (err, respose) => {
          if (err) {
            console.log(err.message + "  failed here");
          } else {
            console.log("saved token");
          }
        }
      )
      .clone();
  } catch (error) {
    if (error) console.log(error.message);
  }
  const transporter = nodemailer.createTransport({
    service: process.env.HOST,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
    tls: { rejectUnauthorized: false },
  });
  let mailOptions = {
    from: "podiousplus@gmail.com",
    to: email,
    subject: "reset password",
    html: `<h2 style="color:orange;">K<span style="color:blue;">INV</span></h2>
           <h6 style="color:crimson;">you requested to change your password. If it's you then click the link</h6>
           <p>  link expires in 15 minutes <a href="${requrl.protocol}//${requrl.host}/ForgotPassword/${token}"> click here</a></p>`
  };
  const send = transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.log(err.message);
      console.log("failed");
      res.json("oops! there was an error ");
    } else {
      res.json({ message: "check mail for next steps" });
    }
  });
};
export default forgotPassword;
