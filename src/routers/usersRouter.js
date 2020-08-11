const express = require('express')
const User = require('../model/User')
const auth = require('../middleware/auth')
const router = new express.Router();


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateJWT()

        res.status(201).send({ user, token })
    }
    catch (e) {
        res.status(401).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateJWT()
        res.send({ user, token })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/me', auth, async (req, res) => {
    try {
        await req.user.populate('orders').execPopulate()
        res.send({ user: req.user, orders: req.user.orders })
    }
    catch (e) {
        res.status(500).send()
    }
})

router.delete('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObj) => {
            return tokenObj.token !== req.token
        })

        await req.user.save()

        res.send(req.user)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.delete('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router