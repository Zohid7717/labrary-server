const Router = require('express')
const authorsControllers = require('../controllers/authorsControllers')
const { isAdmin } = require('../middleware/checkAuth')

const router = new Router()

router.get('/getAll', authorsControllers.getAuthors)
router.post('/addAuthor', isAdmin, authorsControllers.addAuthor)
router.delete('/:id', authorsControllers.deleteAuthor)

module.exports = router