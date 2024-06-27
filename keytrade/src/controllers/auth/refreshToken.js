

import jwt from 'jsonwebtoken';
import { getUserById } from '../../services/auth.js';
import { generateAccessToken } from '../../utils/jwt.js';

const refreshAccessToken = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'invalid user' });
  }

  try {
    let user = await getUserById(userId);

    console.log(user);
    if (user.err) {
      return res.status(400).json({ message: ' user does not exist' });
    }

    let verifiedToken = jwt.verify(user.refreshToken, process.env.SECRET);
    console.log(verifiedToken, 'verified token');

    if (verifiedToken) {
      let token = generateAccessToken(userId);
      console.log(token, 'authorised');

      if (!token) {
        return res.status(500).json({ message: 'Sorry an error occured' });
      }
      return res.status(200).json({ status: 'success', token });
    }
  } catch (err) {
    console.log(err);
    console.log(err.message);
    console.log(err.name);
    if (err.name === 'TokenExpiredError') return res.status(401).json({ message: err.message });
    return res.status(500).json({ message: err.message });
  }
};

export default refreshAccessToken;
