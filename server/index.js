const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const DB = 'mongodb://127.0.0.1/jnotes'

mongoose.connect(DB, {useNewUrlParser: true,  useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {})

const app = express()

const loginRoutes = require('./routes/Login')
const notesRoutes = require('./routes/Notes')
const todoRoutes = require('./routes/Todo')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/login', loginRoutes)
app.use('/notes', notesRoutes)
app.use('/todo', todoRoutes)

app.listen(4444, () => {
    console.log("Server listen on port 4444")
})