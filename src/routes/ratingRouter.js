const Router = require('express')
const ratingControllers = require('../controllers/ratingController')

const router = new Router()

router.post('/getUserRating', ratingControllers.getUserRating)

module.exports = router