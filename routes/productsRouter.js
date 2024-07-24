const Router = require('express')
const productsControllers = require('../controllers/productsControllers')
const router = new Router()

router.get('/getAll', productsControllers.getBooks)

module.exports = router