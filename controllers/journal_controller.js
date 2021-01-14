const express = require('express');
const narativ = express.Router();
const Narativ = require('../models/journalentry.js')

// get route
narativ.get('/', (req, res) => {
    Narativ.find({}, (err, foundJournal) => {
        res.json(foundJournal)
    })
})
// edit route
narativ.put('/:id', (req, res ) => {
    Narativ.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, updatedJournal) => {
            if(err){
                res.send(err);
            }else{
                Narativ.find({}, (err, updatedJournal) => {
                    res.json(updatedJournal)
                })
            }
        }
    )
})
// delete route
narativ.delete('/:id', (req, res) => {
    Narativ.findByIdAndRemove(req.params.id, (err, deletedJournal) => {
        Narativ.find({}, (err, deletedJournal) => {
            res.json(deletedJournal)
        })
    })
})
// post route

narativ.post('/', (req, res) => {
    Narativ.create(req.body, (err, createdJournal) => {
        Narativ.find({}, (err, createdJournal) => {
            res.json(createdJournal)
        })
    })
})

// export route
module.exports = narativ
