const mongoose = require('mongoose')

var streetschema = new mongoose.Schema({
    _id: String,
    nome: String,
    figura: [{
        imagem:String,
        legenda:String
    }],
    comments:[{
        _id:String,
        text:String,
        lugar:[String],
        data:[String],
        entidade:[String]
    }],
    listaCasas:[{
        _id:String,
        numero:String
    }]
})

module.exports = mongoose.model('street', streetschema)