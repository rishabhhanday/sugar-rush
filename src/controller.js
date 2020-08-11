require('./db/mongodb')
const express = require('express')
const usersRouter = require('./routers/usersRouter')
const ordersRouter = require('./routers/ordersRouter')

const app = express()

app.use(express.json())
app.use(usersRouter)
app.use(ordersRouter)

app.listen('3000', () => {
    console.log('server started')
})
