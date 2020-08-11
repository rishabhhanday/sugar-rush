const mongoose = require('mongoose')

const Order = mongoose.model('Order', {
    item: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'NOT ACCEPTED'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Order