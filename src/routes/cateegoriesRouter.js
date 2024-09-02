const Router = require('express')
const categoriesControllers = require('../controllers/categoriesControllers')

const router = new Router()

router.get('/getAll', categoriesControllers.getAll)

module.exports = router
