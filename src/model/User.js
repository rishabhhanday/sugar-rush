const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('Not a valid email .')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 5) {
                throw Error('Password should be of min length 5')
            }
        }
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNo: {
        required: true,
        type: String
    },
    role: {
        type: String,
        default: 'USER',
    },
    tokens: [{
        token: {
            type: String
        }
    }]
})

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.methods.generateJWT = async function () {
    const user = this

    const token = jwt.sign({ _id: user._id.toString() }, 'secret', { expiresIn: '1 hour' })
    user.tokens = user.tokens.concat({ token })

    await user.save()

    return token
}

userSchema.methods.toJSON = function () {
    const user = this

    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw Error('Login failed')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Login failed')
    }

    return user
}

userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'customer'
})

const User = mongoose.model('User', userSchema)

module.exports = User