const Order = require('../model/Order')
const auth = require('../middleware/auth')
const express = require('express')

const router = new express.Router()

router.post('/orders', async (req, res) => {
    try {
        const order = new Order(req.body)
        await order.save()
        await order.populate('product').execPopulate()

        res.status(201).send(order)
    } catch (e) {
        res.status(500).send(e)
    }
})


router.get('/orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({})

        const ordersResponse = []
        for (const order of orders) {
            await order.populate('product').execPopulate()
            ordersResponse.push(order)
        }

        res.send(ordersResponse)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            res.status(401).send()
        }

        await order.populate('product').execPopulate()
        res.send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.put('/orders/:id', auth, async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!order) {
            res.status(401).send()
        }

        await order.populate('product').execPopulate()
        res.send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router

