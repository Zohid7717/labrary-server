const Router = require('express')
const productsRoutes = require('./productsRouter')
const authorsRoutes = require('./authorsRouter')
const publishersRoutes = require('./publishersRouter')
const uploadRoutes = require('./uploadRouter')
const usersRoutes = require('./usersRouter')

const router = new Router()

router.use('/books', productsRoutes)
router.use('/authors', authorsRoutes)
router.use('/publishers', publishersRoutes)
router.use('/upload', uploadRoutes)
router.use('/users', usersRoutes)

module.exports = router