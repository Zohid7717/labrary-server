const Router = require('express')
const productsRoutes = require('./productsRouter')
const authorsRoutes = require('./authorsRouter')
const publishersRoutes = require('./publishersRouter')
const adminsRoutes = require('./adminsRouter')
const usersRoutes = require('./usersRouter')

const router = new Router()

router.use('/books', productsRoutes)
router.use('/authors', authorsRoutes)
router.use('/publishers', publishersRoutes)
// router.use('/admins', adminsRoutes)
router.use('/users', usersRoutes)

module.exports = router