const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Incorrect image format.'))
        }

        cb(undefined, true)
    }
})

const update = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (file && !file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Incorrect image format.'))
        }

        cb(undefined, true)
    }
})

module.exports = { update, upload }