const mongoose = require('mongoose')

const Login = new mongoose.Schema({
    id: Number,
    createdAt: Date,
    name: String,
    avatar: String,
    password: String
})

module.exports = mongoose.model('Login', Login)