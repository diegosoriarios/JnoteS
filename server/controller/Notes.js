const mongoose = require('mongoose')
const Notes = require('../models/Notes')

exports.getAll = (req, res, next) => {
    Notes.
        find().
        exec().
        then(response => res.send(response))
}

exports.createNote = (req, res, next) => {
    const note = new Notes({
        _id: mongoose.Types.ObjectId(),
        userId: req.body.userId,
        createdAt: req.body.createdAt,
        texto: req.body.texto,
        anexo: req.body.anexo,
    })

    return note.save().then(response => res.status(200)).catch(err => console.log(err))
}

exports.deleteNote = (req, res, next) => {
    Notes.deleteOne({_id: req.body._id})
        .exec()
        .then(note => {
            return res.status(200).json({
                message: 'Removed',
            })
        }).catch(err => res.status(500).json({"Err": err}))
}

exports.updateNote = (req, res, next) => {
    let newNote = {
        _id: req.body._id,
        userId: req.body.userId,
        createdAt: req.body.createdAt,
        texto: req.body.texto,
        anexo: req.body.anexo,
    }
    Notes.findOneAndUpdate({_id: req.body._id}, newNote, {upsert: true}, (err, doc) => {
        if(err) return res.send(500, { error: err})
        return res.send(200).json({
            message: "Updated"
        })
    })
}