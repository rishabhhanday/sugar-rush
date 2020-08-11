const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/sugar-rush', {
    useNewUrlParser: true,
    useCreateIndex: true
})