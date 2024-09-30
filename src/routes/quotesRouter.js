const Router = require('express')
const quotesControllers = require('../controllers/quotesControllers')
const { isAdmin } = require('../middleware/checkAuth')
const router = new Router()

router.post('/addQuote', isAdmin, quotesControllers.addQuote)
router.get('/createQuotesTable', quotesControllers.createQuotesTable)
router.get('/getQuotes', quotesControllers.getQuotes)
router.get('/example', quotesControllers.example)

module.exports = router