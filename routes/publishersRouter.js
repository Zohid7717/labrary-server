const Router = require('express')
const publishersControllers = require('../controllers/publishersControllers')
const { isAdmin } = require('../middleware/checkAuth')
const router = new Router()

router.get('/getAll', publishersControllers.getPublishers)
router.post('/addPublisher', isAdmin, publishersControllers.addPublisher)
router.delete('/:id', publishersControllers.deletePublisher)

module.exports = router