var mongoose = require('mongoose');
var local_mongoose = require('passport-local-mongoose');

var user_schema = new mongoose.Schema({
    username: String,
    password: String
});

user_schema.plugin(local_mongoose);

module.exports = mongoose.model('User', user_schema);