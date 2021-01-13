const mongoose = require('mongoose')

const narativSchema = new mongoose.Schema({
    name: {type:String, required: true},
    title: {type:String, required: true},
    body: String, 
    date: {type:Date, default: Date("<YYYY-mm-dd>")},
    // yearMonthDayUTC: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
    
})

const Narativ = mongoose.model('Narativ', narativSchema)

module.exports = Narativ

