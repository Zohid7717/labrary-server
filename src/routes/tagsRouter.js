const Router = require('express')
const tagsControllers = require('../controllers/tagsControllers')

const router = new Router()

router.post('/addTag', tagsControllers.addTag)
router.get('/getTags', tagsControllers.getTags)
router.delete('/deleteTag/:id', tagsControllers.deleteTag)

module.exports = router