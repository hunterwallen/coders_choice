const mongoose = require('mongoose')

const narativSchema = new mongoose.Schema({
    name: {type:String, required: true},
    title: {type:String, required: true},
    body: String,
  }, {timestamps: true})

const Narativ = mongoose.model('Narativ', narativSchema)

module.exports = Narativ
