const mongoose = require('mongoose')

const Notes = new mongoose.Schema({
    id: Number,
    userId: Number,
    createdAt: Date,
    texto: String,
    anexo: String,
})

module.exports = mongoose.model('Note', Notes)