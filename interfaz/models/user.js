var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    email : String,
    password : String,
    name : String,
    type : String
}
)

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('user', User)