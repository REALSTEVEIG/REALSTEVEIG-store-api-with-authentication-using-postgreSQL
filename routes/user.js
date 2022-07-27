const { signup, login} = require('../controllers/user')
const express = require('express')
const userAuth = require('../middleware/userAuth')
const router = express.Router()

router.post('/signup', userAuth.saveUser, signup)

router.post('/login', login )

module.exports = router