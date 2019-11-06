const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    id: Number,
    userId: Number,
    createdAt: Date,
    texto: String,
    finished: Boolean
})

module.exports = mongoose.model('Todo', todoSchema)