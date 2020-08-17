const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    image: {
        type: Buffer
    }
})

productSchema.methods.toJSON = function () {
    const product = this

    const prodObj = product.toObject()
    delete prodObj.image

    return prodObj
}

const Product = mongoose.model('Product', productSchema)

module.exports = Product