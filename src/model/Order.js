const mongoose = require('mongoose')

const Order = mongoose.model('Order', {
    item: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
})

module.exports = Order