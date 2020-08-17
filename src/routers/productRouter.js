const express = require('express')
const Product = require('../model/Product')
const multer = require('multer')
const auth = require('../middleware/auth')
const sharp = require('sharp')
const { update, upload } = require('../middleware/image')

const router = new express.Router()

router.post('/products', auth, upload.single('productImage'), async (req, res) => {
    try {
        const product = new Product(req.body)
        product.image = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).toBuffer()

        await product.save()

        res.status(201).send(product)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.send(products)
    }
    catch (e) {
        console.log(e.message)
        res.status(500).send('Error occured')
    }
})

router.get('/products/:id/image', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.set('Content-Type', 'image/png')
        res.send(product.image)
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
})

router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product)
            res.status(400).send()

        res.send(product)
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
})

router.put('/product/:id', auth, update.single('productImage'), async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!product) {
            res.status(400).send()
        }

        res.send(product)
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
})

module.exports = router
