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
router.post('/uploadBookFile', (req, res) => {
  BookFileHandler.uploadZipFile(req, res)
})
router.post('/uploadEBook', (req, res) => {
  BookFileHandler.uploadEBook(req, res)
})

module.exports = router