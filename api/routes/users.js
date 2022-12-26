const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')

const UsersController = require('../controllers/users')

router.post('/signup', UsersController.user_signup)

router.post('/login', UsersController.user_login)

router.delete('/:userId', checkAuth, UsersController.delete_user_by_id)

module.exports = router