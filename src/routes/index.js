const Router = require('express')
const productsRoutes = require('./productsRouter')
const authorsRoutes = require('./authorsRouter')
const publishersRoutes = require('./publishersRouter')
const uploadRoutes = require('./uploadRouter')
const usersRoutes = require('./usersRouter')
const quotesRoutes = require('./quotesRouter')
const tagsRoutes = require('./tagsRouter')
const uploadBookRoutes = require('./uploadBooksRouter')
const categoriesRoutes = require('./cateegoriesRouter')


const router = new Router()

router.use('/books', productsRoutes)
router.use('/authors', authorsRoutes)
router.use('/publishers', publishersRoutes)
router.use('/upload', uploadRoutes)
router.use('/users', usersRoutes)
router.use('/quotes', quotesRoutes)
router.use('/uploadBook', uploadBookRoutes)
router.use('/tags', tagsRoutes)
router.use('/category', categoriesRoutes)

module.exports = router