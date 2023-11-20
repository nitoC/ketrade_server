import bcrypt from 'bcryptjs';
import joi from '@hapi/joi';
import { createUser, getUserByEmail } from '../../services/auth.js';



const joiSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().min(6).email().required(),
  username: joi.string().required(),
  password: joi.string().required().min(6),
});


const signup = async (req, res) => {
  console.log("in")


  let userExists;
  let { name, email, username, password } = req.body;

  name = name.toLowerCase().trim()
  email = email.toLowerCase().trim()
  username = username.toLowerCase().trim();


  const j = joiSchema.validate({ name, email, username, password });
  if (j.error) return res.status(400).json({ message: j.error.details[0].message });


  try {
    userExists = await getUserByEmail(email);
    console.log(userExists.err)
    if (userExists.err) throw new Error('internal server error')
    console.log('user exist?')
    if (userExists.length > 0) return res.status(409).json({ message: "user exists please login" });
  } catch (err) {
    console.log(err)
    console.log(err.message);
    return res.status(500).json({ message: 'oops! could not validate email' })
  }


  let salt;
  let hash;


  try {
    salt = await bcrypt.genSalt(8);
    hash = await bcrypt.hash(password, salt);
  } catch (error) {
    if (error) console.log("password not hashed");
    return res.status(500).json({ message: 'OOps! something went wrong while signing up' })
  }


  console.log("saving user")


  try {
    let data = await createUser({
      username,
      name,
      email,
      password: hash,
      refreshToken: "",
    })
    if (data.err) throw new Error('internal server error')
    res.status(201).json({ registered: true, payload: data });
  } catch (err) {
    if (err) return res.json({ message: err.message });
  }
};


export default signup;
