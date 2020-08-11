const Order = require('../model/Order')
const express = require('express')

const router = new express.Router()

router.post('/orders', async (req, res) => {
    const order = new Order(req.body)

    await order.save()
    res.status(201).send(order)
})

module.exports = router

