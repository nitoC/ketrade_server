import jwt from 'jsonwebtoken'



const Authorize = (req, res, next) => {
    const { authorization } = req.headers

    try {

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(400).json({ message: 'Invalid or missing Authorization header.' });
        }

        let token = authorization.split(" ")[1];
        console.log(token, 'token')

        let authorized = jwt.verify(token, process.env.SECRET)
        console.log(authorized, 'authorised')

        if (!authorized) {
            return res.status(400).json({ message: "invalid user token" })
        }

        req.user = authorized
        next()

    } catch (err) {
        console.log(err.message)
        console.log(err.name)
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'invalid user token' })
        }
        return res.status(500).json({ message: err.message })
    }
}

export default Authorize;