const jwt = require('jsonwebtoken')
const User = require('../model/User')

const auth = async (req, res, next) => {
    try {
        const authToken = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(authToken, 'secret')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': authToken })

        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = authToken
        next()
    }
    catch (e) {
        res.status(401).send({ errorMessage: 'Please authenticate' })
    }
}

module.exports = auth