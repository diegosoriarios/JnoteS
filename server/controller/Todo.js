const mongoose = require('mongoose')

const Todos = require('../models/Todo')

exports.getAll = (req, res, next) => {
    Todos.
        find().
        exec().
        then(response => res.send(response))
}

exports.createTodo = (req, res, next) => {
    console.log('aqui')
    const todo = new Todos({
        _id: mongoose.Types.ObjectId(),
        userId: req.body.userId,
        createdAt: req.body.createdAt,
        texto: req.body.texto,
        finished: req.body.finished
    })

    return todo.save().then(response => res.status(200)).catch(err => console.log(err))
}

exports.deleteTodo = (req, res, next) => {
    Todos.deleteOne({_id: req.body._id})
        .exec()
        .then(response => {
            return res.status(200).json({
                message: 'Removed',
            })
        }).catch(err => res.status(500).json({"Err": err}))
}

exports.updateTodo = (req, res, next) => {
    let newTodo = {
        _id: req.body._id,
        userId: req.body.userId,
        createdAt: req.body.createdAt,
        texto: req.body.texto,
        finished: req.body.finished
    }
    Todos.findOneAndUpdate({_id: req.body._id}, newTodo, {upsert: true}, (err, doc) => {
        if(err) return res.send(500, { error: err})
        return res.send(200).json({
            message: "Updated"
        })
    })
}