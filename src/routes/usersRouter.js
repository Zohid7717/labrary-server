const Router = require('express')
const usersControllers = require('../controllers/usersControllers')
const { isAdmin, isAuth } = require('../middleware/checkAuth')

const router = new Router()

router.post('/regUser', isAdmin, usersControllers.regUser)
router.post('/regAdmin', usersControllers.regAdmin)
router.get('/getUsers', isAdmin, usersControllers.getUsers)
router.get('/getMe', isAuth, usersControllers.getMe)
router.post('/authUser', usersControllers.getUser)
router.delete('/deleteUser', isAdmin, usersControllers.deleteUser)

module.exports = router