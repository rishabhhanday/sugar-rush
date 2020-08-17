const jwt = require('jsonwebtoken')
const User = require('../model/User')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'secret')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = token
        next()
    }
    catch (e) {
        console.log(e.message)
        res.status(401).send({ errorMessage: 'Please authenticate' })
    }
}

module.exports = auth