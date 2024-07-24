const Router = require('express')
const usersControllers = require('../controllers/usersControllers')
const { isAdmin } = require('../middleware/checkAuth')

const router = new Router()

router.post('/regUser', isAdmin, usersControllers.regUser)
router.post('/regAdmin', usersControllers.regAdmin)
router.get('/getUsers', isAdmin, usersControllers.getUsers)
router.delete('/deleteUser', isAdmin, usersControllers.deleteUser)

module.exports = router