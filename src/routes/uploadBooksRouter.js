const Router = require('express')
const BookFileHandler = require('../controllers/uploadBooksControllers')
const { isAdmin } = require('../middleware/checkAuth')

const router = new Router()

router.post('/uploadBookImg', (req, res) => {
  BookFileHandler.uploadFile(req, res)
})

router.delete('/deleteBookImg/:filename', isAdmin, (req, res) => {
  BookFileHandler.deleteFile(req, res)
})

module.exports = router