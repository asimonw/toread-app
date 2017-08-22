const router = require('express').Router()

router.use('/books', require('./routes/books'))

module.exports = router
