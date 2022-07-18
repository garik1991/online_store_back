const router = require('express').Router()
const userController = require('../controllers/UserController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.auth)

module.exports = router