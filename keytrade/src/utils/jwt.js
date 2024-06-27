import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => jwt.sign({ userId: user }, process.env.SECRET, { expiresIn: '6h' })
const generateRefreshToken = (user) => jwt.sign({ userId: user }, process.env.SECRET, { expiresIn: '12h' })

export { generateAccessToken, generateRefreshToken }