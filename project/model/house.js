const mongoose = require('mongoose')

var houseSchema = new mongoose.Schema({
    _id: String,
    numero:Number,
    enfiteuta: String,
    foro:String,
    rua:String,
    desc:[{
        _id: String,
        text:String,
        lugar:[String],
        data:[String],
        entidade:[String]
    }]
})

module.exports = mongoose.model('houses', houseSchema)