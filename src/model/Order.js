const mongoose = require('mongoose')
const validator = require('validator')

const Order = mongoose.model('Order', {
    status: {
        type: String,
        default: 'IN PROGRESS'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Invalid email address.')
            }
        }
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phoneNo: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = Order