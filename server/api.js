const router = require('express').Router()

router.use('/books', require('./routes/books'))
router.use('/users', require('./routes/users'))

module.exports = router
