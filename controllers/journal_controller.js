const express = require('express');
const narativ = express.Router();
const Narativ = require('../models/journalentry.js')





narativ.get('/', (req, res) => {
    Narativ.find({}, (err, foundJournal) => {
        res.json(foundJournal)
    })
})

narativ.post('/', (req, res) => {
    Narativ.create(req.body, (err, createdJournal) => {
        Narativ.find({}, (err, createdJournal) => {
            res.json(createdJournal)
        })
    })
})




module.exports = narativ