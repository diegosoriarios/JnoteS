const mongoose = require('mongoose')

const Todo = new mongoose.Schema({
    id: Number,
    userId: Number,
    createdAt: Date,
    texto: String,
    finished: Boolean
})

module.exports = mongoose.model('Todo', Todo)