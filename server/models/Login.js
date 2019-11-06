const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    id: Number,
    createdAt: Date,
    name: String,
    avatar: String,
    password: String
})

module.exports = mongoose.model('Login', loginSchema)