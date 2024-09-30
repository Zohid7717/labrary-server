const Router = require('express')
const productsControllers = require('../controllers/productsControllers')
const router = new Router()

router.get('/getAll', productsControllers.getBooks)
router.get('/getBook/:id', productsControllers.getBook)
router.post('/addBook', productsControllers.addBook)

module.exports = router

// title, h_book, e_book, a_book, quantity, book_lang, price, book_location, category_id, author_name, book_about, e_book_img, fragment