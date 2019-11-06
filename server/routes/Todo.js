const express = require('express')
const router = express.Router()

const todoController = require('../controller/Todo')

router.get('/get', todoController.getAll)

router.post('/create', todoController.createTodo)

router.delete('/remove', todoController.deleteTodo)

router.post('/update', todoController.updateTodo)

module.exports = router