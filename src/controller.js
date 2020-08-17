require('./db/mongodb')
const express = require('express')
const usersRouter = require('./routers/usersRouter')
const ordersRouter = require('./routers/ordersRouter')
const productRouter = require('./routers/productRouter')

const app = express()

app.use(express.json())
app.use(usersRouter)
app.use(ordersRouter)
app.use(productRouter)

app.listen('3000', () => {
    console.log('server started')
})
