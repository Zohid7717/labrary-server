const Router = require('express')
const quotesControllers = require('../controllers/quotesControllers')
const { isAdmin } = require('../middleware/checkAuth')
const router = new Router()

router.post('/addQuote', isAdmin, quotesControllers.addQuote)
router.get('/getQuotes', quotesControllers.getQuotes)

module.exports = router