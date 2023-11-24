import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
    return jwt.sign({ userId: user }, process.env.SECRET, { expiresIn: '6h' })
}

const generateRefreshToken = (user) => {
    return jwt.sign({ userId: user }, process.env.SECRET, { expiresIn: '12h' })
}


export {
    generateAccessToken,
    generateRefreshToken
}