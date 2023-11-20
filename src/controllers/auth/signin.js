import mongoose from 'mongoose';
import user from '../../models/user.js';
import bcrypt from 'bcryptjs';
import joi from '@hapi/joi';
import { getUserByEmail, updateUser } from '../../services/auth.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.js';

const signin = async (req, res) => {
  let checkUser;
  let compare;

  let { email, password } = req.body;

  email = email.toLowerCase().trim()



  const joiSchema = joi.object({
    email: joi.string().min(6).email().required(),
    password: joi.string().required().min(6),
  });

  const j = joiSchema.validate({ email, password });
  if (j.error) return res.status(400).json({ message: j.error.details[0].message });



  try {

    checkUser = await getUserByEmail(email)
    if (checkUser.err) throw new Error('internal server error')
    console.log(checkUser, 'check user')

    console.log(checkUser.length, 'checking')
    if (checkUser.length < 1) return res.status(404).json({ message: 1 });
    checkUser = checkUser[0]
    compare = await bcrypt.compare(password, checkUser.password);
    if (!compare) return res.status(401).json({ message: 2 });

    let final = checkUser.toJSON()
    let userId = final._id

    const token = generateAccessToken(userId)
    const refreshToken = generateRefreshToken(userId)
    const updatedUser = await updateUser('refreshToken', userId, refreshToken)
    console.log(updatedUser)

    delete final.password
    console.log('final', final)

    res
      .status(200)
      .json({ user: final, token: token, time: Date.now() + 900000 });

  } catch (error) {
    console.log(error)
    if (error) return res.status(500).json({ message: error.message });
  }

};



export default signin;
