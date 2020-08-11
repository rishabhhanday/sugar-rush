const Order = require('../model/Order')
const auth = require('../middleware/auth')
const express = require('express')

const router = new express.Router()

router.post('/orders', auth, async (req, res) => {
    const orderObj = {
        ...req.body,
        customer: req.user._id
    }
    const order = new Order(orderObj)

    await order.save()
    res.status(201).send(order)
})

router.get('/orders', auth, async (req, res) => {
    try {
        if (req.user.role === 'ADMIN') {
            const orders = await Order.find({})

            return res.send(orders)
        }

        const orders = await Order.find({ customer: req.user._id })
        return res.send(orders)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.get('/orders/:id', auth, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, customer: req.user._id })

        if (!order) {
            return res.status(400).send()
        }
        await order.populate('customer').execPopulate()
        res.send(order)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.delete('/orders/:id', auth, async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ _id: req.params.id, customer: req.user._id })

        if (!order) {
            return res.status(400).send()
        }
        await order.populate('customer').execPopulate()
        res.send(order)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router

