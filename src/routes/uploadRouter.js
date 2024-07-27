const Router = require('express')
const FileHandler = require('../controllers/uploadControllers')
const { isAdmin } = require('../middleware/checkAuth')

const router = new Router()

router.post('/uploadUserImg', isAdmin, (req, res) => {
  FileHandler.uploadFile(req, res)
})
router.delete('/deleteUserImg/:filename', isAdmin, (req, res) => {
  FileHandler.deleteFile(req, res)
})

module.exports = router