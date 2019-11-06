const express = require('express')
const router = express.Router()

const loginController = require('../controller/Login')

router.post('/login', loginController.login)

router.post('/create', loginController.createUser)

router.delete('/remove', loginController.deleteUser)

router.post('/update', loginController.updateUser)

module.exports = router