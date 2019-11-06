const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    id: Number,
    userId: Number,
    createdAt: Date,
    texto: String,
    anexo: String,
})

module.exports = mongoose.model('Note', noteSchema)