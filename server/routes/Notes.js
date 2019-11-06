const express = require('events')
const router = express.Router()

const notesController = require('../controller/Notes')

router.get('/get', notesController.getAll)

router.post('/create', notesController.createNote)

router.delete('/remove', notesController.deleteNote)

router.post('/update', notesController.updateNote)

module.exports = router